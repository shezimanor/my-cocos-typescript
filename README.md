# Cocos Creator 3.8 開發常用腳本

## TouchEventManager

TouchEventManager 不一定是單例模式，看遊戲的邏輯。

用法：綁在父節點上，父節點為可觸控範圍，觸發觸控事件後，可以利用 `updateChildPosition` 更新目標子節點的位置。
