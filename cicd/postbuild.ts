import * as fs from "fs";
import * as path from "path";
import {WebsitesApiClientBuilder} from "@ringpublishing/graphql-api-client";
import gql from "graphql-tag";
import * as packageJson from "../package.json";
import {websiteManagerConfigs} from "../websiteManagerConfigs";
import {Upload} from "@aws-sdk/lib-storage";
import {S3Client} from "@aws-sdk/client-s3";

global.websiteManagerConfigs = websiteManagerConfigs;

import {generateConfig} from "hat-ring-components/src/pages/HatAdmin/generateConfig";

console.log("postbuild started");

const accessKeyId = process.env.OCDN_ACCESS_KEY_ID || process.env.bamboo_OCDN_ACCESS_KEY_ID;
const secretAccessKey = process.env.OCDN_SECRET_ACCESS_KEY || process.env.bamboo_OCDN_SECRET_ACCESS_KEY;
const publicOcdnBucketName =
    process.env.NEXT_PUBLIC_OCDN_BUCKET_NAME || process.env.bamboo_NEXT_PUBLIC_OCDN_BUCKET_NAME;
const WEBSITE_API_PUBLIC = process.env.WEBSITE_API_PUBLIC!;
const WEBSITE_API_SECRET = process.env.WEBSITE_API_SECRET!;
const WEBSITE_API_NAMESPACE_ID = process.env.WEBSITE_API_NAMESPACE_ID!;
const CONFIGURATION_TEMPLATE_NAME = process.env.CONFIGURATION_TEMPLATE_NAME;

async function setWebsiteManagerConfig() {
    // @ts-ignore
    const shouldCreateConfiguration = packageJson.hatCreateConfigurationForWebsiteManager !== false;

    if (!shouldCreateConfiguration) {
        console.log(
            "hatCreateConfigurationForWebsiteManager in package.json is set to false so creation of new Websites Manager is skipped"
        );
        return true;
    }
    const changelog = fs.readFileSync("CHANGELOG.md", "utf-8");
    const match = changelog.match(/## \[(.*)\]/);
    if (match) {
        const version = match[1];
        if (version) {
            const config = await generateConfig();

            if (
                !WEBSITE_API_PUBLIC ||
                !WEBSITE_API_SECRET ||
                !WEBSITE_API_NAMESPACE_ID ||
                !CONFIGURATION_TEMPLATE_NAME
            ) {
                console.log(
                    "missing one of envs: WEBSITE_API_PUBLIC, WEBSITE_API_SECRET, WEBSITE_API_NAMESPACE_ID, CONFIGURATION_TEMPLATE_NAME"
                );
                return false;
            }

            const variables = {
                configStructure: config,
                templateName: CONFIGURATION_TEMPLATE_NAME,
                id: version,
            };

            const query = gql`
                mutation ($id: ID!, $configStructure: JSONObject!, $templateName: String!) {
                    createConfigurationTemplateVersion(
                        input: {id: $id, configurationTemplateName: $templateName, structure: $configStructure}
                    ) {
                        status
                        errors {
                            message
                        }
                    }
                }
            `;

            //@TODO use  WebsitesConfigUtils instead copying code
            const websitesApiApolloClient = new WebsitesApiClientBuilder({
                accessKey: WEBSITE_API_PUBLIC,
                secretKey: WEBSITE_API_SECRET,
                spaceUuid: WEBSITE_API_NAMESPACE_ID,
            }).buildApolloClient();
            const response = await websitesApiApolloClient.query({query, variables, fetchPolicy: "no-cache"});
            console.log("Create variant response:", JSON.stringify(response));
        } else {
            console.log("problem with getting ");
        }
    }
}

async function uploadStatics() {
    // If there is no bucket we are on docker
    if (publicOcdnBucketName === undefined || accessKeyId === undefined || secretAccessKey === undefined) {
        console.log(
            "No NEXT_PUBLIC_OCDN_BUCKET_NAME or OCDN_ACCESS_KEY_ID or NEXT_PUBLIC_OCDN_BUCKET_NAME environment variable, returning"
        );
        return false;
    }

    const uploadDir = function (localPath: string, bucketName: string, s3dir: string) {
        const s3 = new S3Client({
            endpoint: "https://ocdn.eu",
            region: "ocdn",
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
            forcePathStyle: true,
            tls: false,
        });

        function walkSync(currentDirPath: string, callback: (filePath: string, stat: fs.Stats) => void) {
            fs.readdirSync(currentDirPath).forEach(function (name) {
                var filePath = path.join(currentDirPath, name);
                var stat = fs.statSync(filePath);
                if (stat.isFile()) {
                    callback(filePath, stat);
                } else if (stat.isDirectory()) {
                    walkSync(filePath, callback);
                }
            });
        }

        function getContentTypeByFile(fileName: string) {
            var rc = "application/octet-stream";
            var fn = fileName.toLowerCase();
            if (fn.indexOf(".html") >= 0) rc = "text/html";
            else if (fn.indexOf(".css") >= 0) rc = "text/css";
            else if (fn.indexOf(".json") >= 0) rc = "application/json";
            else if (fn.indexOf(".js") >= 0) rc = "application/javascript";
            else if (fn.indexOf(".png") >= 0) rc = "image/png";
            else if (fn.indexOf(".jpg") >= 0) rc = "image/jpg";
            else if (fn.indexOf(".svg") >= 0) rc = "image/svg+xml";
            return rc;
        }

        walkSync(localPath, async function (filePath: string) {
            let bucketPath = filePath.substring(localPath.length + 1).replace(/\\/gi, "/");
            let params = {
                Bucket: bucketName,
                Key: s3dir + bucketPath,
                Body: fs.readFileSync(filePath),
                ContentType: getContentTypeByFile(filePath),
            };
            try {
                await new Upload({
                    client: s3,
                    params,
                }).done();
            } catch (s3Err) {
                throw new Error(s3Err);
            }
        });
    };

    const configurationTemplateName = process.env.CONFIGURATION_TEMPLATE_NAME;
    const assetsPath = 'astro/assets/' + configurationTemplateName + '/';

    uploadDir("dist/client", publicOcdnBucketName, assetsPath);

    return console.log(
        `Static files uploaded to S3, now you can set assetPrefix: 'https://ocdn.eu/${publicOcdnBucketName}/${assetsPath}/' in astro.config.mjs`
    );
}

setWebsiteManagerConfig();
uploadStatics();
