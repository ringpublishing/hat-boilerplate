import { MiddlewareHelper_processRequest} from "hat-server";
import { CacheProvider, MonitoringProvider} from "hat-ring-components";
import type {APIContext, MiddlewareNext} from "astro";
import { gql } from "@ringpublishing/graphql-api-client";
let gqlResetCachesTimestamp = new Date().getTime();
const GQL_CACHE_RESET_INTERVAL_SECONDS = Number(process.env.GQL_CACHE_RESET_INTERVAL_SECONDS) || 300;

export const onRequest = async (context: APIContext, next: MiddlewareNext) => {
    if (gqlResetCachesTimestamp < new Date().getTime()) {
        gql.resetCaches();
        gqlResetCachesTimestamp = new Date().getTime() + GQL_CACHE_RESET_INTERVAL_SECONDS * 1000;
    }
    return MiddlewareHelper_processRequest({
        context,
        next,
        MonitoringProvider,
        bootServerOptions: {
            apolloClientTimeout: 20000,
            cacheProvider: CacheProvider,
        },
        omitBootServerPaths: {
            POST: [],
            GET: []
        }
    });
};
