import { Component, ViewEncapsulation } from '@angular/core';
import { LayoutService } from '../layout.service';
import { Menu } from 'src/environments/routes';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/services/config.service';

@Component({
  selector: 'ns-sider',
  templateUrl: './sider.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SiderComponent {
  constructor(public layout: LayoutService, public config: ConfigService, public router: Router, public activated: ActivatedRoute) {}

  nodeClick(menu: Menu) {
    if (menu.type != 'router') {
      this.router.navigate([menu.router], { relativeTo: this.activated });
      this.layout.drawerVisible = false;
      this.layout.defaultActivatedId = menu.id;
    }
  }
}
