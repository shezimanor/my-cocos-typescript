import {
  _decorator,
  Component,
  EventTouch,
  input,
  Input,
  Node,
  UITransform,
  Vec3
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Cursor')
export class Cursor extends Component {
  @property(Node)
  public theNode: Node = null;

  public tempUIVec3: Vec3 = new Vec3(0, 0, 0);
  public tempLocalVec3: Vec3 = new Vec3(0, 0, 0);

  protected onLoad(): void {
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    input.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
  }

  protected onDestroy(): void {
    input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    input.off(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
  }

  onTouchStart(event: EventTouch) {
    // event.propagationStopped = true;
    this.updateGuideLinePosition(event);
  }
  onTouchMove(event: EventTouch) {
    // event.propagationStopped = true;
    this.updateGuideLinePosition(event);
  }
  onTouchEnd(event: EventTouch) {
    // event.propagationStopped = true;
    this.updateGuideLinePosition(event);
  }

  private updateGuideLinePosition(event: EventTouch) {
    // 取得當前觸控點的 UI 座標
    const touchUIPosition = event.getUILocation();
    this.tempUIVec3.set(touchUIPosition.x, touchUIPosition.y, 0);
    // 轉換為本地座標
    this.node
      .getComponent(UITransform)
      .convertToNodeSpaceAR(this.tempUIVec3, this.tempLocalVec3);
    // 更新位置
    // 也可以在更新前限制一下 x,y 的範圍(ex: math.clamp(x, -100, 100))
    this.theNode.setPosition(this.tempLocalVec3);
  }
}
