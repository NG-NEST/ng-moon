import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { XDatePickerComponent } from "./date-picker.component";
import { XDatePickerPortalComponent } from "./date-picker-portal.component";
import { XInputModule } from "@ng-nest/ui/input";
import { XPortalModule } from "@ng-nest/ui/portal";
import { XIconModule } from "@ng-nest/ui/icon";
import { XListModule } from "@ng-nest/ui/list";
import { XButtonModule } from "@ng-nest/ui/button";
import { XFenceModule } from "@ng-nest/ui/fence";

@NgModule({
  declarations: [XDatePickerComponent, XDatePickerPortalComponent],
  exports: [XDatePickerComponent, XDatePickerPortalComponent],
  entryComponents: [XDatePickerPortalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    XPortalModule,
    XInputModule,
    XButtonModule,
    XFenceModule,
    XIconModule,
    XListModule
  ]
})
export class XDatePickerModule {}