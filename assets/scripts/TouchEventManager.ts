import {
  _decorator,
  Component,
  director,
  EventTouch,
  Input,
  Label,
  Node,
  UITransform,
  v3,
  Vec3
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TouchEventManager')
export class TouchEventManager extends Component {
  @property({ type: Node, tooltip: '跟著觸控點移動的節點' })
  public childNode: Node = null;

  // 暫存用 Vec3
  private tempLocalVec3: Vec3 = v3(0, 0, 0);
  private tempTouchUIVec3: Vec3 = v3(0, 0, 0);
  // 平滑模式才會用到
  private tempTargetVec3: Vec3 = v3(0, 0, 0);
  // 平滑模式標記
  private isSmooth: boolean = false;
  // 移動的平滑係數(0-1) 1為立刻移動
  private smoothFactor: number = 0.2;

  protected onLoad(): void {
    // 他不能掛在 Canvas 以外的地方，因為 node 要在畫面上
    this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
  }

  start() {
    if (this.isSmooth) {
      this.tempTargetVec3.set(this.childNode.position);
    }
  }

  update(deltaTime: number) {
    if (!this.isSmooth || !this.childNode) return;

    // 平滑模式
    const currentPosition = this.childNode.position;
    const newPosition = new Vec3(
      currentPosition.x +
        (this.tempTargetVec3.x - currentPosition.x) * this.smoothFactor,
      currentPosition.y +
        (this.tempTargetVec3.y - currentPosition.y) * this.smoothFactor,
      0
    );

    this.childNode.setPosition(newPosition);
  }

  protected onDestroy(): void {
    this.node.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.off(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
  }

  onTouchStart(event: EventTouch) {
    event.propagationStopped = true; // 停止事件傳遞
    this.updateChildPosition(event);
  }

  onTouchMove(event: EventTouch) {
    event.propagationStopped = true; // 停止事件傳遞
    this.updateChildPosition(event);
  }

  onTouchEnd(event: EventTouch) {
    event.propagationStopped = true; // 停止事件傳遞
  }

  private updateChildPosition(event: EventTouch) {
    if (!this.childNode) return;

    // 1. 取得當前觸控點的 UI 座標(已考慮解析度)
    const touchUIPosition = event.getUILocation();
    // 2. 轉換為本地座標
    const localPosition = this.tempLocalVec3;
    this.node
      .getComponent(UITransform)
      .convertToNodeSpaceAR(
        this.tempTouchUIVec3.set(touchUIPosition.x, touchUIPosition.y, 0),
        localPosition
      );
    // 3. 更新子節點位置
    this.childNode.setPosition(localPosition.x, localPosition.y, 0);
    // 4. 更新暫存用 Vec3
    this.tempTargetVec3.set(localPosition.x, localPosition.y, 0);
  }
}
