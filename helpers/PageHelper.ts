import { AppContext, SiteContentType } from "hat-ring-components";
import { HATUrlWithParsedQuery } from "@ringpublishing/hat-server";
import * as _ from "lodash";

export class PageHelper {
  static mapSearchParamsToAppContext(
    searchParams: HATUrlWithParsedQuery,
    customData: any = {}
  ): AppContext {
    const context: AppContext = {
      siteContentType: searchParams.hatControllerParams.gqlResponse.data.site
        ?.data?.content?.__typename as SiteContentType,
      id: searchParams.hatControllerParams.gqlResponse.data.site?.data?.content
        ?.id,
      url: searchParams.url,
      hatControllerParams: searchParams.hatControllerParams,
      customData,
    };

    return context;
  }
}
