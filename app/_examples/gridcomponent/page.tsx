import { AppContext, SiteContentType } from "hat-ring-components";
import { Grid } from "hat-ring-components";
import { widgets } from "./widgets";
import "styles/gridComponentPage.scss";
import { HATUrlWithParsedQuery } from "@ringpublishing/hat-server";
import { PageHelper } from "helpers/PageHelper";
import * as _ from "lodash";

// IMPORTANT next build does not execute custom server so searchParams are empty. We rely here on them that is why we need
// to set this page to dynamic mode
export const revalidate = 0;

export default async function GridComponent({
  params,
  searchParams,
}: {
  params: any;
  searchParams: HATUrlWithParsedQuery;
}) {
  const context = PageHelper.mapSearchParamsToAppContext(searchParams, {
    widgets,
  });

  return (
    <div className={"gridComponentPage"}>
      <h1>
        Grid example (it works only with Ring Website Template configuration)
      </h1>
      <header>
        {/* @ts-expect-error Server Component */}
        <Grid
          context={context}
          config={{
            containers: ["headerWidgets"],
            boxes: [
              "widgets_above_content",
              "widgets_middle_content",
              "widgets_below_content",
            ],
          }}
        />
      </header>

      {/* @ts-expect-error Server Component */}
      <Grid
        context={context}
        config={{
          containers: ["HomePage1", "HomePage2", "HomePage3", "HomePage4"],
          boxes: [
            "box_top",
            "box_left",
            "box_middle",
            "box_right",
            "box_bottom",
          ],
        }}
      />

      <footer>
        {/* @ts-expect-error Server Component */}
        <Grid
          context={context}
          config={{
            containers: ["footerWidgets"],
            boxes: [
              "widgets_above_content",
              "widgets_middle_content",
              "widgets_under_content",
            ],
          }}
        />
      </footer>
    </div>
  );
}
