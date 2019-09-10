import { Component, OnInit } from "@angular/core";
import { NmData } from "ng-moon/interfaces/data.type";
import { NmSliderNode } from "ng-moon";

@Component({
  selector: "ex-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class ExDefaultComponent implements OnInit {
  data: NmData<NmSliderNode[]> = [
    { nmKey: 1, nmLabel: "栅格" },
    { nmKey: 2, nmLabel: "代码高亮" },
    { nmKey: 3, nmLabel: "SVG图标" },
    { nmKey: 4, nmLabel: "滑块" }
  ];
  constructor() {}

  ngOnInit() {}
}