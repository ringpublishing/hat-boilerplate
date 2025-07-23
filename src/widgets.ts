import * as ringWidgets from "hat-ring-components";
import * as localWidgets from "./components";
import * as localSlots from "./components/slots";


export const widgets = Object.assign(
    {},
    ringWidgets,
    {DetailTitle: ringWidgets.StoryTitle},
    {DetailMainImage: ringWidgets.StoryMainImage},
    {DetailContent: ringWidgets.StoryContent},
    {DetailTaxonomyList: ringWidgets.StoryTaxonomyList},
    {DetailArticleDate: ringWidgets.StoryDate},
    localWidgets
);


export const slots = Object.assign(
    {},
    localSlots,
);
