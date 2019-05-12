import { NcPage } from "./../../../interfaces/page";
import { NcComponents } from "./components";
import { isString } from "util";
import { docsPrefix, NcDocs, ncMenus } from "..";

const componentsFolder = "../../../../../libraries/ng-moon/src/components";

const uiPrefix = `${docsPrefix}-ui`;

export class NcUiPage extends NcPage {
  constructor(param: NcUiPage | string) {
    if (isString(param)) param = { name: param, prefix: uiPrefix };
    super(param);
  }
}

export class NcUi {
  private components = new NcComponents();
  init() {
    this.components.init(componentsFolder);
    console.log(docsPrefix);
    console.log(ncMenus);
    console.log((global["NcDocs"] as NcDocs).page.templates);
  }
}
