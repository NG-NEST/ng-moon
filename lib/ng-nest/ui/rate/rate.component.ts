import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  Input,
  ViewChild
} from '@angular/core';
import { XIsEmpty, XNumber, XClearClass, XConfigService } from '@ng-nest/ui/core';
import { XRatePrefix, XRateProperty } from './rate.property';
import { XValueAccessor } from '@ng-nest/ui/base-form';

@Component({
  selector: `${XRatePrefix}`,
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XRateComponent)]
})
export class XRateComponent extends XRateProperty {
  @ViewChild('rate', { static: true }) rate!: ElementRef;
  rates: number[] = [];

  hoverActivated = 0;
  hoverHalfActivated = 0;

  writeValue(value: any) {
    if (XIsEmpty(value)) value = 0;
    this.value = value;
    this.hoverActivated = value;
    this.hoverHalfActivated = Math.ceil(value);
    this.cdr.detectChanges();
  }

  rateNodes: any = [];
  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setRates();
    this.setFlex(this.rate.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setClassMap();
  }

  setClassMap() {
    XClearClass(this.labelMap);
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  setRates() {
    this.rates = Array(this.count)
      .fill(0)
      .map((_, i) => i + 1);
  }

  rateHover(rate: number, event: MouseEvent) {
    if (this.disabled) return;
    this.hoverActivated = rate;
    this.cdr.detectChanges();
  }

  leaveRates() {
    if (this.disabled) return;
    const activited = this.value;
    this.hoverActivated = activited;
    this.hoverHalfActivated = Math.ceil(activited);
    this.cdr.detectChanges();
  }

  rateClick(rate: number, event: MouseEvent) {
    if (this.disabled) return;
    this.value = this.value === rate ? 0 : rate;
    if (this.onChange) this.onChange(this.value);
  }

  rateHalfHover(rate: number, event: MouseEvent) {
    if (this.disabled) return;
    this.hoverActivated = rate - 1;
    this.hoverHalfActivated = rate;
    this.cdr.detectChanges();
  }

  rateHalfClick(rate: number, event: MouseEvent) {
    if (this.disabled) return;
    this.value = rate - 0.5;
    if (this.onChange) this.onChange(this.value);
  }

  trackByItem(index: number, item: number) {
    return item;
  }

  formControlChanges() {
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}
