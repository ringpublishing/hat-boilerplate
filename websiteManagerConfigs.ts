import * as ringWidgets from "hat-ring-components/src/websitesApiConfigs";
import * as localWidgets from "./src/components/websitesApiConfigs";


export const websiteManagerConfigs = Object.assign({}, { ...ringWidgets, ...localWidgets });
