import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef} from "@angular/core";

@Component({
  selector: "nm-tab-content",
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./nm-tab-content.component.html"
})
export class NmTabContentComponent {
  @Input() nmContent: TemplateRef<void>;
  @Input() nmActive = false;
}
