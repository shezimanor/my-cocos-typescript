import { _decorator, Component, EventTouch, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Cursor')
export class Cursor extends Component {
  @property(Node)
  public theNode: Node = null;

  public tempUIVec3: Vec3 = new Vec3(0, 0, 0);
  public tempLocalVec3: Vec3 = new Vec3(0, 0, 0);

  private updateGuideLinePosition(event: EventTouch) {
    // 取得當前觸控點的 UI 座標
    const touchUIPosition = event.getUILocation();
    this.tempUIVec3.set(touchUIPosition.x, touchUIPosition.y, 0);
    // 轉換為本地座標
    const localPosition = this.tempLocalVec3;
    this.node
      .getComponent(UITransform)
      .convertToNodeSpaceAR(this.tempUIVec3, localPosition);
    // 得到本地座標 Vec3
    this.theNode.setPosition(localPosition);
  }
}
