import { AppContext, GenericList } from "hat-ring-components";

export default async function SiteNode({ context }: { context: AppContext }) {
  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <GenericList
        widgetConfig={{
          headerTag: "h1",
          headerText: "Header List",
          paginationElements: 9,
          postShift: 0,
          columns: 3,
          imageSize: "800x600",
          imageSizeMobile: "800x600",
          showOptions: ["title", "image"],
          customListUuid: "",
        }}
        context={context}
      />
    </div>
  );
}
