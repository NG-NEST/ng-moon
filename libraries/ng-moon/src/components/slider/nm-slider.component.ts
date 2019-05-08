import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  TemplateRef
} from "@angular/core";
import {
  SliderPrefix,
  NmSliderOption,
  NmSliderLayoutEnum,
  NmSliderBorderPositionEnum,
  NmActivatedSlider,
  NmSliderNode
} from "./nm-slider.type";
import { fillDefault } from "../../core/util";
import { NmData } from "../../interfaces/data.type";
import { Subject, BehaviorSubject, Observable, Subscription } from "rxjs";

@Component({
  selector: "nm-slider",
  templateUrl: "./nm-slider.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmSliderComponent implements OnInit, OnChanges {
  @Input() nmData?: NmData<NmSliderNode[]>;
  @Input() nmLayout?: NmSliderLayoutEnum;
  @Input() nmBorderPosition?: NmSliderBorderPositionEnum;
  @Input() nmNodeTemplate?: TemplateRef<any>;

  private _nmActivatedIndex: number;
  public get nmActivatedIndex(): number {
    return this._nmActivatedIndex;
  }
  @Input()
  public set nmActivatedIndex(value: number) {
    this._nmActivatedIndex = value;
    this.setHighlight();
    this.cdr.detectChanges();
  }

  @Output() nmActivatedChange?: EventEmitter<
    NmActivatedSlider
  > = new EventEmitter<NmActivatedSlider>();

  private default: NmSliderOption = {
    nmData: [],
    nmLayout: NmSliderLayoutEnum.Row,
    nmBorderPosition: NmSliderBorderPositionEnum.Bottom,
    nmActivatedIndex: 0
  };

  @ViewChild("sliders") slidersRef: ElementRef;
  @ViewChild("highlight") highlightRef: ElementRef;
  _data: NmSliderNode[] = [];

  private data$: Subscription | null = null;

  @HostBinding(`class.${SliderPrefix}`) className() {
    return true;
  }

  @HostBinding(`class.${SliderPrefix}-${NmSliderLayoutEnum.Row}`)
  get getLayoutRow() {
    if (this.nmLayout === NmSliderLayoutEnum.Row) {
      if (
        [
          NmSliderBorderPositionEnum.Left,
          NmSliderBorderPositionEnum.Right
        ].indexOf(this.nmBorderPosition) > -1
      ) {
        this.nmBorderPosition = NmSliderBorderPositionEnum.Bottom;
      }
      return true;
    }
    return false;
  }

  @HostBinding(`class.${SliderPrefix}-${NmSliderLayoutEnum.Column}`)
  get getLayoutColumn() {
    if (this.nmLayout === NmSliderLayoutEnum.Column) {
      if (
        [
          NmSliderBorderPositionEnum.Top,
          NmSliderBorderPositionEnum.Bottom
        ].indexOf(this.nmBorderPosition) > -1
      ) {
        this.nmBorderPosition = NmSliderBorderPositionEnum.Left;
      }
      return true;
    }
    return false;
  }

  @HostBinding(
    `class.${SliderPrefix}-border-position-${NmSliderBorderPositionEnum.Top}`
  )
  get getBorderPositionTop() {
    return this.nmBorderPosition == NmSliderBorderPositionEnum.Top;
  }

  @HostBinding(
    `class.${SliderPrefix}-border-position-${NmSliderBorderPositionEnum.Right}`
  )
  get getBorderPositionRight() {
    return this.nmBorderPosition == NmSliderBorderPositionEnum.Right;
  }

  @HostBinding(
    `class.${SliderPrefix}-border-position-${NmSliderBorderPositionEnum.Bottom}`
  )
  get getBorderPositionBottom() {
    return this.nmBorderPosition == NmSliderBorderPositionEnum.Bottom;
  }

  @HostBinding(
    `class.${SliderPrefix}-border-position-${NmSliderBorderPositionEnum.Left}`
  )
  get getBorderPositionLeft() {
    return this.nmBorderPosition == NmSliderBorderPositionEnum.Left;
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    fillDefault(this, this.default);
    this.setData();
  }

  ngAfterViewInit() {
    this.setHighlight();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const nmDataChange = changes.nmData;
    if (
      nmDataChange &&
      nmDataChange.currentValue !== nmDataChange.previousValue
    ) {
      this.setData();
    }
  }

  action(type: string, option?: any, index?: any) {
    switch (type) {
      case "click":
        this.nmActivatedIndex = index;
        this.setHighlight();
        this.nmActivatedChange.emit({
          nmActivatedIndex: index,
          nmActivatedSlider: option
        });
        this.cdr.detectChanges();
        break;
    }
  }

  setData() {
    if (typeof this.nmData === "undefined") return;
    if (this.nmData instanceof Array) {
      this.setDataChange(this.nmData);
    } else if (this.nmData instanceof BehaviorSubject) {
      if (this.data$) this.data$.unsubscribe();
      this.data$ = this.nmData.subscribe(x => {
        this.setDataChange(x);
      });
    } else if (this.nmData instanceof Observable) {
      if (this.data$) this.data$.unsubscribe();
      this.data$ = this.nmData.subscribe(x => {
        this.setDataChange(x);
      });
    }
  }

  setDataChange(value: NmSliderNode[]) {
    this._data = value;
    setTimeout(() => this.setHighlight());
    this.cdr.detectChanges();
  }

  setHighlight() {
    const activeEle = this.slidersRef.nativeElement.querySelector(
      `li:nth-child(${this.nmActivatedIndex + 1})`
    );
    if (activeEle) {
      const width =
        this.nmLayout == NmSliderLayoutEnum.Column
          ? "100%"
          : `${activeEle.offsetWidth}px`;
      this.renderer.setStyle(this.highlightRef.nativeElement, "width", width);
      this.renderer.setStyle(
        this.highlightRef.nativeElement,
        "height",
        `${activeEle.offsetHeight}px`
      );
      this.renderer.setStyle(
        this.highlightRef.nativeElement,
        "left",
        `${activeEle.offsetLeft}px`
      );
      this.renderer.setStyle(
        this.highlightRef.nativeElement,
        "top",
        `${activeEle.offsetTop}px`
      );
    }
  }
}
