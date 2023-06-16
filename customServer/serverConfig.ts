import { BootServer, BootServerConfig, DefaultHatSite } from "@ringpublishing/hat-server";
import http from "http";
import type { ApolloQueryResult } from "@apollo/client";

export const serverConfig = {
  onRequest: (req, res) => {
    // custom headers
    res.setHeader("cache-control", "max-age=300");
  },
  additionalDataInHatControllerParams: (
    gqlResponse: ApolloQueryResult<DefaultHatSite>
  ) => {
    return {
      myCustomKey: "myCustomValue",
    };
  },
  shouldMakeRequestToWebsiteAPIOnThisRequest: (
    req: http.IncomingMessage,
    defaultPathCheckValue
  ) => {
    return defaultPathCheckValue;
  },
  useDefaultHeaders: true,
  useWebsitesAPIRedirects: true,
  useHatControllerParams: true,
  useWebsitesAPI: true,
  enableDebug: false,
  prepareCustomGraphQLQueryToWebsiteAPI: () => {},
} as BootServerConfig;
