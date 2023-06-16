import React from "react";
import { AppContext } from "hat-ring-components";
import { BasicWidgetConfig, BasicWidgetResponseNode } from "../types";
import gql from "graphql-tag";

export default function PublicationDate({
  context,
  widgetConfig,
  data,
}: {
  context: AppContext;
  widgetConfig: BasicWidgetConfig;
  data: BasicWidgetResponseNode;
}) {
  return (
    <div className={["PublicationDate"].join(" ")}>{data.creationTime}</div>
  );
}

PublicationDate.getFragment = () => {
  return {
    variables: {},
    query: gql`
      fragment ExtendedQuery on SectionItem {
        ordering
      }
    `,
  };
};
