import { _decorator, EventTarget } from 'cc';
const { ccclass } = _decorator;

@ccclass('EventManager')
export class EventManager {
  private constructor() {}
  public static eventTarget: EventTarget = new EventTarget();
}

// 使用範例
// EventManager.eventTarget.on('eventName', callback, this);
// EventManager.eventTarget.emit('eventName', data);
