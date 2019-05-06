import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmIconComponent } from "./nm-icon.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmIconModule } from "./nm-icon.module";
import { IconPrefix } from "./nm-icon.type";

describe(IconPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmIconModule],
      declarations: [TestNmIconComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmIconComponent>;
    let testComponent: TestNmIconComponent;
    let debugElement: DebugElement;
    let element: Element;
    let shadowRoot: DocumentFragment;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmIconComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NmIconComponent));
      element = debugElement.nativeElement;
      shadowRoot = element.shadowRoot;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(IconPrefix);
    });
    it("should ant-design fill icon.", () => {
      testComponent.type = "adf-shopping";
      fixture.detectChanges();
      expect(element.classList).toContain(testComponent.type);
    });
    it("should ant-design outline icon.", () => {
      testComponent.type = "ado-shopping";
      fixture.detectChanges();
      expect(element.classList).toContain(testComponent.type);
    });
    it("should ant-design twotone icon.", () => {
      testComponent.type = "adt-shopping";
      fixture.detectChanges();
      expect(element.classList).toContain(testComponent.type);
    });
  });
});

@Component({
  selector: "test-nm-icon",
  template: `
    <nm-icon [nmType]="type"></nm-icon>
  `
})
class TestNmIconComponent {
  type: string;
}
