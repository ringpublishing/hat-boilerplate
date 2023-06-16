import {
  AppContext,
  StoryTitle,
  StoryMainImage,
  StoryContent,
  StoryLiveBlog,
  Grid,
} from "hat-ring-components";
import { widgets } from "../../_examples/gridcomponent/widgets";
import { PageHelper } from "../../../helpers/PageHelper";

export default async function Story({ context }: { context: AppContext }) {
  context.customData = { ...context.customData, widgets };

  if (context.hatControllerParams?.urlWithParsedQuery?.query.grid) {
    return (
      <div>
        {/* @ts-expect-error Server Component */}
        <Grid
          context={context}
          config={{
            containers: [
              "DetailExtendedWidgets1",
              "DetailExtendedWidgets2",
              "DetailExtendedWidgets3",
              "DetailExtendedWidgets4",
            ],
            boxes: [],
          }}
        />
      </div>
    );
  }

  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <StoryTitle context={context} />

      {/* @ts-expect-error Server Component */}
      <StoryMainImage
        context={context}
        widgetConfig={{ standardImageSize: "1600x900" }}
      />

      {/* @ts-expect-error Server Component */}
      <StoryContent context={context} widgetConfig={{}} />

      {/* @ts-expect-error Server Component */}
      <StoryLiveBlog
        context={context}
        widgetConfig={{ liveBlogClientId: "VxxE5vatw", liveBlogLanguage: "pl" }}
      />
    </div>
  );
}
