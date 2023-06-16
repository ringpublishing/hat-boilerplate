import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import * as fs from "fs";
import * as path from "path";

const accessKeyId =
  process.env.OCDN_ACCESS_KEY_ID || process.env.bamboo_OCDN_ACCESS_KEY_ID;
const secretAccessKey =
  process.env.OCDN_SECRET_ACCESS_KEY ||
  process.env.bamboo_OCDN_SECRET_ACCESS_KEY;
const publicOcdnBucketName =
  process.env.NEXT_PUBLIC_OCDN_BUCKET_NAME ||
  process.env.bamboo_NEXT_PUBLIC_OCDN_BUCKET_NAME;

async function uploadStatics() {
  // If there is no bucket we are on docker
  if (publicOcdnBucketName === undefined) {
    console.log('No NEXT_PUBLIC_OCDN_BUCKET_NAME environment variable, returning');
    return false;
  }

  const uploadDir = function (localPath, bucketName, s3dir) {
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

    function walkSync(currentDirPath, callback) {
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

    function getContentTypeByFile(fileName) {
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

    walkSync(localPath, async function (filePath, stat) {
      let bucketPath = filePath
        .substring(localPath.length + 1)
        .replace(/\\/gi, "/");
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

  uploadDir(".next/static", publicOcdnBucketName, "hatstatic/_next/static/");
  return console.log(
    `Static files uploaded to S3, now you can set assetPrefix: 'https://ocdn.eu/${publicOcdnBucketName}/hatstatic/' in next.config.js`
  );
}

uploadStatics();
