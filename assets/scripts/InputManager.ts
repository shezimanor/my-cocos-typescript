import {
  _decorator,
  Component,
  director,
  Node,
  EventTarget,
  Input,
  input,
  __private,
  EventTouch,
  EventKeyboard,
  KeyCode,
  v3,
  Vec3,
  UITransform
} from 'cc';
const { ccclass, property } = _decorator;

// 參考：https://docs.cocos.com/creator/3.8/manual/zh/engine/event/event-input.html

@ccclass('InputExample')
export class InputExample extends Component {
  // 暫存用 Vec3
  private tempLocalVec3: Vec3 = v3(0, 0, 0);
  private tempTouchUIVec3: Vec3 = v3(0, 0, 0);

  protected onLoad(): void {
    // 全局觸控
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    // 鍵盤事件
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    // 節點觸控
    this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
  }

  protected onDestroy(): void {
    // 全局觸控
    input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    // 鍵盤事件
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    // 節點觸控
    this.node.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.off(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
  }

  onTouchStart(event: EventTouch) {
    // event.propagationStopped = true;
    // Location on screen space
    console.log(event.getLocation());
    // Location on UI space
    console.log(event.getUILocation());
  }

  onTouchMove(event: EventTouch) {
    // event.propagationStopped = true;
  }

  onTouchEnd(event: EventTouch) {
    // event.propagationStopped = true;
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        console.log('Press a key');
        break;
    }
  }

  onKeyUp(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        console.log('Release a key');
        break;
    }
  }

  convertLocationExample(event: EventTouch) {
    // 取得當前觸控點的 UI 座標
    const touchUIPosition = event.getUILocation();
    this.tempTouchUIVec3.set(touchUIPosition.x, touchUIPosition.y, 0);
    // 轉換為本地座標
    const localPosition = this.tempLocalVec3;
    this.node
      .getComponent(UITransform)
      .convertToNodeSpaceAR(this.tempTouchUIVec3, localPosition);
    // localPosition 現在是觸控點的本地座標
  }
}
