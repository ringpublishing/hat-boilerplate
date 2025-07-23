import {defineConfig} from 'astro/config';
import node from "@astrojs/node";
import react from "@astrojs/react";
import {fileURLToPath} from 'url';
import path, {dirname} from 'path';

const isDev = process.env.NODE_ENV !== 'production';
const isOnBamboo = process.env.IS_ON_BAMBOO === 'true';
const imageHost = process.env.NEXT_PUBLIC_ACC_IMAGES_ENDPOINT;
const configurationTemplateName = process.env.CONFIGURATION_TEMPLATE_NAME;
const assetsPath = 'astro/assets/' + configurationTemplateName;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
    site: 'https://example.dev',
    integrations: [react()],
    output: "server",
    adapter: node({
        mode: "standalone"
    }),
    build: {
        assets: assetsPath,
        assetsPrefix: !isDev && isOnBamboo ? 'https://' + imageHost + '/' + assetsPath : ''
    },
    vite: {
        define: {
            '__VERSION__': JSON.stringify(process.env.npm_package_version),
        },
        resolve: {
            alias: {
                "@common": `${path.resolve(__dirname, './node_modules/hat-ring-components/src/components/common')}`,
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    // TODO: In the future we can inject global scss variables here
                    // https://gist.github.com/ricardoaguiar/95f8fb9d07a5d498ac40e321fd60c572
                },
            }
        }
    }
});
