import { Input, Output, EventEmitter, Component } from '@angular/core';
import { XStatus, XPlace, XInputBoolean, XTemplate, XEffect, XBoolean, XIsBoolean, XWithConfig } from '@ng-nest/ui/core';
import { XAlertProperty, XAlertOption } from '@ng-nest/ui/alert';
import { XPortalOverlayRef } from '@ng-nest/ui/portal';
import { XDialogComponent } from './dialog.component';

/**
 * Dialog
 * @selector x-dialog
 * @decorator component
 */
export const XDialogPrefix = 'x-dialog';

const X_CONFIG_NAME = 'dialog';

export const XDialogPortal = 'x-dialog-portal';

/**
 * Dialog Property
 */
@Component({ template: '' })
export class XDialogProperty extends XAlertProperty {
  @Input() @XInputBoolean() visible: boolean = false;
  /**
   * @zh_CN 方位，九宫格
   * @en_US Direction, nine grid
   */
  @Input() @XWithConfig<XPlace>(X_CONFIG_NAME, 'center') placement!: XPlace;
  /**
   * @zh_CN 偏移距离
   * @en_US Offset distance
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '1rem') offset!: string;
  /**
   * @zh_CN 类型
   * @en_US Types of
   */
  @Input() type: XDialogType = 'info';
  /**
   * @zh_CN 宽度
   * @en_US Width
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '32rem') width?: string;
  /**
   * @zh_CN 高度
   * @en_US Height
   */
  @Input() height?: string;
  /**
   * @zh_CN 样式主题
   * @en_US Style theme
   */
  @Input() @XWithConfig<XEffect>(X_CONFIG_NAME, 'white') effect!: XEffect;
  /**
   * @zh_CN 底部自定义模板
   * @en_US Custom template at the bottom
   */
  @Input() footer?: XTemplate;
  /**
   * @zh_CN 显示取消按钮
   * @en_US Show cancel button
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) showCancel!: XBoolean;
  /**
   * @zh_CN 取消按钮文字
   * @en_US Cancel button text
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) cancelText?: string;
  /**
   * @zh_CN 显示确认按钮
   * @en_US Show confirmation button
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) showConfirm!: XBoolean;
  /**
   * @zh_CN 确认按钮文字
   * @en_US Confirm button text
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) confirmText?: string;
  /**
   * @zh_CN 点击遮罩关闭
   * @en_US Click the mask to close
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) backdropClose!: XBoolean;
  /**
   * @zh_CN 是否显示背景遮罩
   * @en_US Whether to display the background mask
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) hasBackdrop!: XBoolean;
  /**
   * @zh_CN 自定义样式名
   * @en_US Custom style name
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '') className!: string;
  /**
   * @zh_CN 按钮居中
   * @en_US Button center
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() buttonsCenter?: XBoolean;
  /**
   * @zh_CN 拖动对话框
   * @en_US Drag dialog
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, false) @XInputBoolean() draggable?: XBoolean;
  /**
   * @zh_CN 关闭前处理函数
   * @en_US Processing function before closing
   */
  @Input() beforeClose!: Function;
  /**
   * @zh_CN 取消按钮的事件
   * @en_US Cancel button event
   */
  @Output() cancel = new EventEmitter();
  /**
   * @zh_CN 确认按钮的事件
   * @en_US Confirm button event
   */
  @Output() confirm = new EventEmitter();
  /**
   * @zh_CN 显示/隐藏改变事件
   * @en_US Show/hide change events
   */
  @Output() visibleChange = new EventEmitter<boolean>();
  /**
   * @zh_CN 弹出完成动画加载
   * @en_US Pop up complete animation loading
   */
  @Output() showDone = new EventEmitter<any>();
  /**
   * @zh_CN 关闭完成动画
   * @en_US Close complete animation
   */
  @Output() closeDone = new EventEmitter<any>();
}

export interface XDialogOption extends XAlertOption {
  visible?: boolean;
  /**
   * @zh_CN 方位，九宫格
   * @en_US Direction, nine grid
   */
  placement?: XPlace;
  /**
   * @zh_CN 偏移距离
   * @en_US Offset distance
   */
  offset?: string;
  /**
   * @zh_CN 类型
   * @en_US Types of
   */
  type?: XDialogType;
  /**
   * @zh_CN 宽度
   * @en_US Width
   */
  width?: string;
  /**
   * @zh_CN 高度
   * @en_US Height
   */
  height?: string;
  /**
   * @zh_CN 样式主题
   * @en_US Style theme
   */
  effect?: XEffect;
  /**
   * @zh_CN 底部自定义模板
   * @en_US Custom template at the bottom
   */
  footer?: XTemplate;
  /**
   * @zh_CN 显示取消按钮
   * @en_US Show cancel button
   */
  showCancel?: XBoolean;
  /**
   * @zh_CN 取消按钮文字
   * @en_US Cancel button text
   */
  cancelText?: string;
  /**
   * @zh_CN 显示确认按钮
   * @en_US Show confirmation button
   */
  showConfirm?: XBoolean;
  /**
   * @zh_CN 确认按钮文字
   * @en_US Confirm button text
   */
  confirmText?: string;
  /**
   * @zh_CN 点击遮罩关闭
   * @en_US Click the mask to close
   */
  backdropClose?: XBoolean;
  /**
   * @zh_CN 是否显示背景遮罩
   * @en_US Whether to display the background mask
   */
  hasBackdrop?: XBoolean;
  /**
   * @zh_CN 自定义样式名
   * @en_US Custom style name
   */
  className?: string;
  /**
   * @zh_CN 按钮居中
   * @en_US Button center
   */
  buttonsCenter?: XBoolean;
  /**
   * @zh_CN 拖动对话框
   * @en_US Drag dialog
   */
  draggable?: XBoolean;
  /**
   * @zh_CN 关闭前处理函数
   * @en_US Processing function before closing
   */
  beforeClose?: Function;
}

export interface XDialogCallback {
  (action: XDialogAction, message?: string): void;
}

export type XDialogAction = 'confirm' | 'cancel';

/**
 * @zh_CN 创建的消息对象
 * @en_US Message object created
 */
export interface XDialogOverlayRef extends XPortalOverlayRef<XDialogComponent> {}

export interface XDialogRef {
  ref?: XDialogOverlayRef;
  input?: XDialogProperty;
}

/**
 * @zh_CN 类型
 * @en_US Types of
 */
export type XDialogType = XStatus;
