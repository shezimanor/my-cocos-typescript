import { _decorator, Component, director, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
  private static _instance: GameManager = null;
  public static get instance(): GameManager {
    return GameManager._instance;
  }

  protected onLoad(): void {
    // 設為常駐節點(防止切換場景時被卸載)
    director.addPersistRootNode(this.node);
  }

  start() {}

  update(deltaTime: number) {}

  protected onDestroy(): void {
    if (GameManager._instance === this) {
      GameManager._instance = null;
    }
  }
}
