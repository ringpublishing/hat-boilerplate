import {
  BasicWidgetConfig as BasicWidgetConfigCore,
  BasicWidgetResponseNode as BasicWidgetResponseNodeCore,
} from "hat-ring-components/src/components/widgets/common/BasicWidget/types";

export interface BasicWidgetResponseNode extends BasicWidgetResponseNodeCore {
  creationTime: string;
}

export interface BasicWidgetConfig extends BasicWidgetConfigCore {
  publicationTime: string;
}
