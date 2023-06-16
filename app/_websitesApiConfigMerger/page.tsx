import { HATUrlWithParsedQuery } from "hat-server";
import { configs } from "./configs";
import * as _ from "lodash";

const fs = require("fs");

export default async function WebsitesApiConfigMerger({
  params,
  searchParams,
}: {
  params: {
    path: Array<string>;
  };
  searchParams: HATUrlWithParsedQuery;
}) {
  let config = {};

  function customizer(objValue, srcValue) {
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  }

  for (const [key, componentsConfig] of Object.entries(configs)) {
    config = _.mergeWith(config, componentsConfig, customizer);
  }

  const modules = Object.keys(config["modules"]) || [];

  function populateWidgets(obj) {
    const stringsToReplace = [
      "GULP-MODULES-LIST",
      "GULP-DETAIL-MODULES-LIST",
      "GULP-HEAD-MODULES-LIST",
      "GULP-HEADER-MODULES-LIST",
      "GULP-FOOTER-MODULES-LIST",
      "GULP-AMP-MODULES-LIST",
    ];
    if (typeof obj === "object") {
      for (const [key, v] of Object.entries(obj)) {
        if (typeof obj[keys] === "object") {
          populateWidgets(obj[keys]);
        } else {
          if (typeof obj[keys] === "string") {
            if (stringsToReplace.includes(obj[keys])) {
              obj[keys] = modules;
            }
          }
        }
      }
    }
    return obj;
  }

  populateWidgets(config);

  fs.writeFileSync("configMerger/config.json", JSON.stringify(config, null, 4));

  return <>done</>;
}
