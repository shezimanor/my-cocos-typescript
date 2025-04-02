import { _decorator, Component, director, Node, EventTarget } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EventManager')
export class EventManager extends Component {
  private static _instance: EventManager = null;
  public static get instance(): EventManager {
    return EventManager._instance;
  }

  public eventTarget: EventTarget = new EventTarget();

  protected onLoad(): void {
    // 單例模式
    if (!EventManager._instance) {
      // console.log('EventManager instance created');
      EventManager._instance = this;
    } else {
      this.destroy();
    }
  }

  protected onDestroy(): void {
    if (EventManager._instance === this) {
      EventManager._instance = null;
    }
  }
}
