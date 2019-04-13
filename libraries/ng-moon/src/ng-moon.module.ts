import { NgModule, ModuleWithProviders } from '@angular/core';
import { NmInputModule } from './input/nm-input.module';

export * from './input';

@NgModule({
  exports: [
    NmInputModule
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
