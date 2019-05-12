import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsFormDesignComponent } from "./form-design.component";
{{ __imports }}
const routes: Routes = [
  {
    path: "",
    component: NsFormDesignComponent,
    children: [{{ __children }}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsFormDesignRoutesModule {}
