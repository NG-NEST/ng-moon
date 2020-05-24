import { Component } from '@angular/core';
import { XTableAction, XTableColumn } from '@ng-nest/ui/table';
import { ExScrollService } from './scroll.service';

@Component({
  selector: 'ex-scroll',
  templateUrl: './scroll.component.html',
  styles: [
    `
      .header-name,
      .body-name {
        display: flex;
        align-items: center;
      }
      .header-name > span,
      .body-name > span {
        margin-left: 0.25rem;
      }
    `
  ],
  providers: [ExScrollService]
})
export class ExScrollComponent {
  constructor(public service: ExScrollService) {}

  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 100, left: 0, type: 'index' },
    { id: 'name', label: '用户', width: 150, left: 100, search: true, sort: true },
    { id: 'position', label: '职位', width: 200, sort: true },
    { id: 'email', label: '邮箱', width: 200 },
    { id: 'phone', label: '电话', flex: 1 },
    { id: 'organization', label: '组织机构', width: 150, sort: true }
  ];

  actions: XTableAction[] = [
    { label: '新增', icon: 'fto-plus', type: 'primary' },
    { label: '导出', icon: 'fto-download' },
    { label: '批量操作', icon: 'fto-list' },
    {
      icon: 'fto-menu',
      title: '列表视图',
      activated: true,
      actionLayoutType: 'top-right-icon'
    },
    {
      icon: 'fto-disc',
      title: '组织视图',
      actionLayoutType: 'top-right-icon',
      group: 'organization'
    },
    {
      icon: 'fto-briefcase',
      title: '职位视图',
      actionLayoutType: 'top-right-icon',
      group: 'position'
    },
    {
      icon: 'fto-edit',
      title: '编辑',
      actionLayoutType: 'row-icon'
    },
    {
      icon: 'fto-trash-2',
      title: '删除',
      actionLayoutType: 'row-icon'
    }
  ];
}
