import {
  ExternalAPIComponent,
  WebsitesAPIComponent,
} from "hat-example-components";
import {
  AppContext,
  StoryTitle,
  StoryMainImage,
  SiteContentType,
  HtmlInsert,
} from "hat-ring-components";
import "styles/examples.scss";
import ExternalAPIComponentStyles from "styles/ExternalApiComponent.module.scss";
import { HATUrlWithParsedQuery } from "hat-server";
import Link from "next/link";
import { PageHelper } from "helpers/PageHelper";
import * as _ from "lodash";

export const revalidate = 0;
export default async function ExamplePage({
  params,
  searchParams,
}: {
  params: {};
  searchParams: HATUrlWithParsedQuery;
}) {
  const storyExampleId = "a491092e-52bd-4114-8a41-1fc74e5b2157";

  let context = PageHelper.mapSearchParamsToAppContext(searchParams);
  context.id = storyExampleId;
  /* example context = {"id":"a491092e-52bd-4114-8a41-1fc74e5b2157","url":"/_examples","hatControllerParams":{"gqlResponse":{"data":{"site":{"statusCode":404,"headers":{"location":null},"data":{"node":{"id":"8d7d6170-a96b-11e9-8e46-78a9dbc1db34"},"content":{"id":"a491092e-52bd-4114-8a41-1fc74e5b2157"}}}}},"customData":{"myCustomKey":"myCustomValue"},"urlWithParsedQuery":{"protocol":null,"slashes":null,"auth":null,"host":null,"port":null,"hostname":null,"hash":null,"search":null,"query":{},"pathname":"/_examples","path":"/_examples","href":"/_examples"},"isMobile":false},"customData":{}}*/

  return (
    <>
      <div className={"examples"}>
        <div className={"row"}>
          <div className={"left"}>
            <h2>ExternalAPIComponent example</h2>
            <ul>
              <li>request to external API in backend</li>
              <li>
                css module styling (all components should have own css module to
                style itself but define only functional styles - minimum)
              </li>
              <li>
                2 ways how to extend/overwrite styling
                <ol>
                  <li>from global styles (example.scss)</li>
                  <li>as css module sent via props</li>
                </ol>
              </li>
              <li>component has basic tests written using cypress</li>
            </ul>
          </div>
          <div className={"right"}>
            {/* @ts-expect-error Server Component */}
            <ExternalAPIComponent
              location={"Szczebrzeszyn"}
              cssModuleClass={ExternalAPIComponentStyles.module}
            />
          </div>
        </div>

        <div className={"row"}>
          <div className={"left"}>
            <h2>WebsitesAPIComponent example</h2>
            <ul>
              <li>request to Websites API in backend via WebsitesApiClient</li>
              <li>
                2 lists on the same page - they &apos;talk to each other&apos;
                not to duplicate items, they use global context for this purpose
                (be aware that all components render asynchronously with no
                order predefined)
              </li>
              <li>images are resized by OCDN library</li>
            </ul>
          </div>
          <div className={"right "}>
            <div className={"row noborder"}>
              <div className={"left"}>
                <h2>List 1</h2>
                {/* @ts-expect-error Server Component */}
                <WebsitesAPIComponent
                  context={context}
                  config={{ limit: 5, offset: 0 }}
                  key={"list1"}
                />
              </div>
              <div className={"right"}>
                <h2>List 2</h2>
                {/* @ts-expect-error Server Component */}
                <WebsitesAPIComponent
                  context={context}
                  config={{ limit: 5, offset: 3 }}
                  key={"list2"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={"row"}>
          <div className={"left"}>
            <h2>StoryTitle example</h2>
            <ul>
              <li>request to Websites API in backend via WebsitesApiClient</li>
              <li>id of story comes from global context</li>
              <li>
                if response mock is passed via props it will use it instead of
                calling API
              </li>
            </ul>
          </div>
          <div className={"righ"}>
            {/* @ts-expect-error Server Component */}
            <StoryTitle
              context={context}
              widgetConfig={{
                response: { data: { story: { name: "Story title" } } },
              }}
            />
          </div>
        </div>
        <div className={"row"}>
          <div className={"left"}>
            <h2>StoryMainImage example</h2>
            <ul>
              <li>request to Websites API in backend via WebsitesApiClient</li>
              <li>id of story comes from global context</li>
              <li>
                width and height in props - used to transform image on query
                level
              </li>
            </ul>
          </div>
          <div className={"right "}>
            {/* @ts-expect-error Server Component */}
            <StoryMainImage
              context={context}
              widgetConfig={{
                standardImageSize: "500x300",
                response: {
                  data: {
                    story: {
                      image: {
                        url: "https://ocdn.eu/pulscms-transforms/1/UufktkpTURBXy9hOGY4YWIyZmM2M2M5ZGIwOGNjOWJlZGU4ZDc2ZjA4My5qcGeSlQMAG80DM80BzJMFzQH0zQEs",
                        caption: "ringpublishing logo color onblack",
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className={"row"}>
          <div className={"left"}>
            <h2>Grid example</h2>
            <ul>
              <li>
                request to Websites API in backend via WebsitesApiClient to get
                Grid config
              </li>
              <li>all widgets are passed to grid via context</li>
            </ul>
          </div>
          <div className={"right "}>
            <h3>
              <Link href="/_examples/gridcomponent" prefetch={false}>
                Click here to see Grid component
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
