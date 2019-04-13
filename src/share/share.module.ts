import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OverlayModule } from "@angular/cdk/overlay";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { PortalModule } from "@angular/cdk/portal";
import { LayoutModule } from "@angular/cdk/layout";
import { RouterModule } from "@angular/router";
import { DevelopingComponent } from "./developing/developing.component";
import { NmAnchorComponent } from "./anchor/anchor.component";
import { NmAnchorLinkComponent } from "./anchor/anchor-link.component";

const components = [
  DevelopingComponent,
  NmAnchorComponent,
  NmAnchorLinkComponent
];

const entryComponents = [];

const modules = [
  CommonModule,
  FormsModule,
  RouterModule,
  ReactiveFormsModule,
  OverlayModule,
  PortalModule,
  DragDropModule,
  LayoutModule
];

const providers = [];

@NgModule({
  imports: [...modules],
  declarations: [...components],
  exports: [...components, ...modules],
  entryComponents: [...entryComponents],
  providers: [...providers]
})
export class ShareModule {}
