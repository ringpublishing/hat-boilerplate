import {
  AppContext,
  StoryTitle,
  StoryMainImage,
  SiteContentType,
} from "hat-ring-components";
import { HATUrlWithParsedQuery } from "@ringpublishing/hat-server";
import * as RoutingComponents from "./routes";
import { PageHelper } from "helpers/PageHelper";
export const revalidate = 0;
export default async function DefaultPath({
  params,
  searchParams,
}: {
  params: {
    path: Array<string>;
  };
  searchParams: HATUrlWithParsedQuery;
}) {
  const context = PageHelper.mapSearchParamsToAppContext(searchParams);
  //const context = {"siteContentType":"Story","id":"d3f7bc8c-610e-4ea6-87eb-1f12b529748c","url":"/favicon.ico","hatControllerParams":{"gqlResponse":{"data":{"site":{"statusCode":200,"headers":{"location":null},"data":{"node":{"id":"8d7d6170-a96b-11e9-87d0-74c3ae739884"},"content":{"__typename":"Story","id":"d3f7bc8c-610e-4ea6-87eb-1f12b529748c","title":"Lorem ipsum dolor"}}}}},"customData":{"myCustomKey":"myCustomValue"},"urlWithParsedQuery":{"protocol":null,"slashes":null,"auth":null,"host":null,"port":null,"hostname":null,"hash":null,"search":null,"query":{},"pathname":"/news/seo-title/m90yzsw","path":"/news/seo-title/m90yzsw","href":"/news/seo-title/m90yzsw"}},"customData":{}};

  const RoutingComponent = RoutingComponents[context.siteContentType]
    ? RoutingComponents[context.siteContentType]
    : RoutingComponents["NotHandled"];

  return (
    <div className={["DefaultPath", "container"].join(" ")}>
      <RoutingComponent context={context} />
    </div>
  );
}
