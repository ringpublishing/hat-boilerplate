import type {AppContext, SiteContentType} from "hat-ring-components";
import {HatControllerParams} from "hat-server";

export class PageHelper {
    static mapSearchParamsToAppContext(
        controllerParams: HatControllerParams,
        customData: any,
        cssModules: any = {},
    ): AppContext {
        const context: AppContext = {
            siteContentType: controllerParams.gqlResponse?.data?.site?.data
                ?.content?.__typename as SiteContentType,
            siteNodeId: controllerParams.gqlResponse?.data?.site?.data.node.id,
            id: controllerParams.gqlResponse?.data?.site?.data?.content?.id,
            url: controllerParams.urlWithParsedQuery?.pathname || "/",
            hatControllerParams: controllerParams,
            customData,
            cssModules,
            websiteManagerVariant: controllerParams.websiteManagerVariant,
        };

        return context;
    }
}
