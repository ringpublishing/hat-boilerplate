import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription,
} from "hat-ring-components/src/types/abstracts"

export let ExampleComponentWebsitesConfig = {
    sections: [],
    defaultParams: {},
    paramsDescription: {},
    modules: {
        exampleComponent_wdg: {
            name: "Example component",
            defaultParams: {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                widgetType: "exampleComponent",
            },
            paramsDescription: {
                ...AbstractWebsitesWidgetConfigParamsDescription
            },
        },
    },
}
