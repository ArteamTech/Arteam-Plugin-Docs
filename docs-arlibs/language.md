---
sidebar_position: 5
---

# 语言模块

:::note 开发中
语言模块目前正在开发中，此文档是对计划功能的预览。
:::

ArLibs 的语言模块将提供完整的多语言支持系统，帮助插件开发者轻松实现国际化，根据服务器或玩家的语言偏好显示不同语言的消息。

## 计划特性

- **多语言文件支持** - 自动加载和管理多种语言的翻译文件
- **变量替换** - 支持在翻译中使用变量和格式化
- **玩家语言偏好** - 根据玩家的语言设置发送对应语言的消息
- **默认语言回退** - 当翻译缺失时自动回退到默认语言
- **重载支持** - 运行时重新加载语言文件，无需重启服务器
- **内置常用语言** - 预置常见语言的翻译模板
- **格式继承** - 支持格式代码在变量替换中的继承

## 预期用法

以下是语言模块计划支持的用法示例：

### 基本设置

```kotlin
// 在插件的 onEnable() 方法中初始化语言模块
val languageManager = LanguageManager.init(plugin)
    .defaultLanguage("zh_CN")                 // 设置默认语言
    .addLanguage("en_US")                     // 添加支持的其他语言
    .addLanguage("zh_TW")
    .langFolder("lang")                       // 语言文件存放的目录
    .load()                                   // 加载所有语言文件
```

### 语言文件格式

语言文件使用 YAML 格式，例如 `lang/zh_CN.yml`：

```yaml
messages:
  welcome: "&a欢迎来到服务器, %player%!"
  balance: "&e你的余额: &f%balance%"
  
errors:
  permission: "&c你没有权限执行此命令!"
  player-not-found: "&c找不到玩家: %player%"
  
ui:
  title: "&b服务器信息"
  online-players: "&7在线玩家: &f%count%"
```

### 获取翻译

```kotlin
// 获取简单翻译
val welcomeMsg = languageManager.get("messages.welcome")

// 带变量的翻译
val balanceMsg = languageManager.get("messages.balance", mapOf(
    "balance" to "1000"
))

// 为特定玩家获取翻译 (根据玩家语言偏好)
val playerMsg = languageManager.get(player, "messages.welcome", mapOf(
    "player" to player.name
))

// 直接发送消息给玩家 (自动应用玩家语言偏好)
languageManager.send(player, "messages.welcome", mapOf(
    "player" to player.name
))
```

### 高级用法

#### 条件翻译

根据条件选择不同的翻译文本：

```kotlin
// 条件翻译
val timeMsg = languageManager.getConditional(player, "time.greeting", mapOf(
    "player" to player.name,
    "time" to currentHour
), { params ->
    val hour = params["time"] as Int
    when {
        hour < 6 -> "time.night"
        hour < 12 -> "time.morning"
        hour < 18 -> "time.afternoon"
        else -> "time.evening"
    }
})
```

#### 列表翻译

处理列表类型的翻译：

```kotlin
// 列表翻译
val onlinePlayers = server.onlinePlayers.map { it.name }
val playerListMsg = languageManager.getList(player, "players.online", mapOf(
    "count" to onlinePlayers.size,
    "players" to onlinePlayers
))
```

#### 复数形式支持

根据数量使用不同的翻译文本：

```kotlin
// 复数形式支持
val itemMsg = languageManager.getPlural(player, "inventory.items", mapOf(
    "count" to itemCount
))

// 对应的语言文件:
# inventory:
#   items:
#     zero: "你的背包是空的"
#     one: "你的背包中有 1 个物品"
#     many: "你的背包中有 %count% 个物品"
```

## 计划时间线

语言模块预计将在 ArLibs 的未来版本中实现，基本功能包括：

1. 多语言文件的加载和管理
2. 基本的翻译获取和变量替换
3. 玩家语言偏好支持
4. 默认语言回退机制

高级功能如条件翻译、列表翻译和复数形式支持将在后续版本中逐步添加。