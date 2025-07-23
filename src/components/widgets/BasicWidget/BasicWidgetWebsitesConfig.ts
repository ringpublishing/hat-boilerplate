import {BasicWidgetWebsitesConfig as BasicWidgetWebsitesConfigBase} from "hat-ring-components/src/websitesApiConfigs";

const showOptionsToAdd = ['exampleAdditionalPart'];

BasicWidgetWebsitesConfigBase.modules.basicWidget_wdg.paramsDescription.showOptions.items.push(
    ...showOptionsToAdd.filter(
        option => !BasicWidgetWebsitesConfigBase.modules.basicWidget_wdg.paramsDescription.showOptions.items.includes(option)
    )
);

export let BasicWidgetWebsitesConfig = Object.assign({}, BasicWidgetWebsitesConfigBase);

