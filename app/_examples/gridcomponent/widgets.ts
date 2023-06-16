import * as exampleWidgets from "hat-example-components";
import * as ringWidgets from "hat-ring-components";
import * as localWidgets from "./components";

export const widgets = Object.assign(
  {},
  exampleWidgets,
  ringWidgets,
  localWidgets,
  { DetailTitle: ringWidgets.StoryTitle },
  { DetailMainImage: ringWidgets.StoryMainImage },
  { DetailContent: ringWidgets.StoryContent }
);
