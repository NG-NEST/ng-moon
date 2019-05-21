import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NmInputComponent } from "./nm-input.component";
import { NmIconModule } from "../../basic/icon/nm-icon.module";

@NgModule({
  declarations: [NmInputComponent],
  exports: [NmInputComponent],
  imports: [CommonModule, NmIconModule, FormsModule, ReactiveFormsModule]
})
export class NmInputModule {}
