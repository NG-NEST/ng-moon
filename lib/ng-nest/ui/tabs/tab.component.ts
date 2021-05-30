import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { XTabPrefix, XTabProperty } from './tabs.property';
import { XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: `${XTabPrefix}`,
  templateUrl: './tab.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTabComponent extends XTabProperty {
  @ViewChild(TemplateRef, { static: true }) content!: TemplateRef<void>;

  constructor(public configService: XConfigService) {
    super();
  }
}
