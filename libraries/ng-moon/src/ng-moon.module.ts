import { NgModule, ModuleWithProviders } from "@angular/core";

import { NmIconModule } from "./components/basic/icon/nm-icon.module";
import { NmSliderModule } from "./components/basic/slider/nm-slider.module";

import { NmInputModule } from "./components/combination/input/nm-input.module";
import { NmAnchorModule } from "./components/combination/anchor/nm-anchor.module";
import { NmTabsModule } from "./components/combination/tabs/nm-tabs.module";

import { NmDocModule } from "./components/senior/doc/nm-doc.module";
import { NmExamplesModule } from './components/senior/exmaples/nm-examples.module';

export * from "./components/basic/icon";
export * from "./components/basic/slider";
export * from "./components/combination/anchor";
export * from "./components/combination/input";
export * from "./components/combination/tabs";
export * from "./components/senior/doc";
export * from "./components/senior/exmaples";
export * from "./core/util";

@NgModule({
  exports: [
    NmIconModule,
    NmSliderModule,
    NmInputModule,
    NmAnchorModule,
    NmTabsModule,
    NmDocModule,
    NmExamplesModule
  ]
})
export class NgMoonModule {
  /**
   * @deprecated Use `NgMoonModule` instead.
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgMoonModule
    };
  }
}
