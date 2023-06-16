"use server";
import React from "react";
import { BasicWidgetParams } from "hat-ring-components/src/components/widgets/common/BasicWidget/types";
import {
  BasicWidget as BasicWidgetCore,
  WidgetHelper,
} from "hat-ring-components";
import * as projectItemParts from "./itemParts";
import * as coreItemParts from "hat-ring-components/src/components/widgets/common/BasicWidget/itemParts";
import CustomBasicWidget from "styles/CustomBasicWidget.module.scss";

export async function BasicWidget({
  widgetConfig,
  context,
}: BasicWidgetParams) {
  const itemParts = Object.assign({}, coreItemParts, projectItemParts);
  const basicWidgetCore = await BasicWidgetCore({
    widgetConfig,
    context,
    extendableAttributes: {
      itemParts: itemParts,
      generalParts: null,
      render: (generalComponents, cssModules) => {
        return (
          <div
            className={WidgetHelper.getWidgetCssClasses(widgetConfig, [
              "CustomBasicWidget",
              cssModules,
            ])}
          >
            {generalComponents}
          </div>
        );
      },
      getCssModule: (defaultStyles) => {
        // @ts-ignore
        switch (widgetConfig.dedicatedStyleForWidget) {
          case "project":
            return [defaultStyles, CustomBasicWidget.CustomBasicWidget].join(
              " "
            );
          case "none":
            return "";
          default:
            return defaultStyles;
        }
      },
      getDataQueryNodeFragment: `
                creationTime
                originalContent {
                ... on Story {
                    image {
                        crop {
                            width
                        }
                    }
                }
            }
            `,
    },
  });

  return basicWidgetCore;
}
