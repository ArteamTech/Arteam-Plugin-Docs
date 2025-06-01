# 动作模块 API 指南 ⚡

> 强大的动作系统，让游戏交互变得简单而灵活

## 📖 简介

ArLibs 的动作模块提供了一个灵活的动作系统，让开发者能够轻松创建和执行各种游戏动作。它支持：

- 基础动作（消息、声音、标题等）
- 条件动作
- 延迟动作
- 命令执行
- 动作组合
- 异步执行
- 动作解析器

## 🎯 快速开始

### 1. 基础动作

```kotlin
// 发送消息
val tellAction = ActionAPI.parseAction("tell 你好，世界！")
tellAction.execute(player)

// 播放声音
val soundAction = ActionAPI.parseAction("sound ENTITY_PLAYER_LEVELUP-1.0-1.0")
soundAction.execute(player)

// 显示标题
val titleAction = ActionAPI.parseAction("title `主标题` `副标题` 10 40 10")
titleAction.execute(player)
```

### 2. 条件动作

```kotlin
// 条件判断
val conditionalAction = ActionAPI.parseAction("""
    if {permission example.admin} then {
        tell 你有管理员权限
        sound ENTITY_PLAYER_LEVELUP-1.0-1.0
    } else {
        tell 你没有管理员权限
        sound ENTITY_VILLAGER_NO-1.0-1.0
    }
""".trimIndent())
conditionalAction.execute(player)
```

## 🔧 API 详解

### 动作类型

#### 1. 基础动作

```kotlin
// 发送消息
tell <消息内容>

// 播放声音
sound <声音>-<音量>-<音调>
// 音量范围：0.0-10.0
// 音调范围：0.5-2.0
// 常用音效：
// - ENTITY_EXPERIENCE_ORB_PICKUP
// - ENTITY_PLAYER_LEVELUP
// - BLOCK_NOTE_BLOCK_PLING
// - ENTITY_VILLAGER_YES
// - ENTITY_VILLAGER_NO
// - BLOCK_ANVIL_USE
// - ENTITY_ITEM_PICKUP
// - UI_BUTTON_CLICK

// 显示标题
title `<主标题>` `<副标题>` <淡入时间> <停留时间> <淡出时间>
// 时间单位：游戏刻（1秒 = 20刻）
// 默认值：淡入=10，停留=70，淡出=20
// 支持变量：%player% 会被替换为玩家名称

// 显示动作栏
actionbar <消息内容>

// 执行命令
command <命令内容>

// 控制台命令
console <命令内容>

// 延迟执行
delay <延迟时间(刻)>
```

#### 2. 条件动作

```kotlin
// 基本条件
if {条件} then {动作} [else {动作}]

// 多条件组合
if {all [条件1; 条件2; ...]} then {动作}
if {any [条件1; 条件2; ...]} then {动作}
if {not 条件} then {动作}
```

### 动作组合

```kotlin
// 顺序执行
ActionGroup(
    TellAction("第一条消息"),
    DelayAction(20), // 1秒
    TellAction("第二条消息")
).execute(player)

// 条件组合
ConditionalAction(
    condition = PermissionCondition("example.admin"),
    thenActions = listOf(
        TellAction("你有权限"),
        SoundAction("ENTITY_PLAYER_LEVELUP", 1.0f, 1.0f)
    ),
    elseActions = listOf(
        TellAction("你没有权限"),
        SoundAction("ENTITY_VILLAGER_NO", 1.0f, 1.0f)
    )
).execute(player)
```

## ⚠️ 注意事项

### 1. 动作解析

```kotlin
// ❌ 错误示例：错误的动作格式
val wrongAction = ActionAPI.parseAction("tell") // 缺少消息内容

// ✅ 正确示例：正确的动作格式
val correctAction = ActionAPI.parseAction("tell 这是一条消息")
```

### 2. 条件语法

```kotlin
// ❌ 错误示例：错误的条件语法
val wrongCondition = ActionAPI.parseAction("""
    if {permission example.admin} {  // 缺少 then 关键字
        tell 你有权限
    }
""".trimIndent())

// ✅ 正确示例：正确的条件语法
val correctCondition = ActionAPI.parseAction("""
    if {permission example.admin} then {
        tell 你有权限
    }
""".trimIndent())
```

### 3. 延迟执行

```kotlin
// ❌ 错误示例：直接使用 Thread.sleep
val wrongDelay = ActionAPI.parseAction("""
    tell 开始
    Thread.sleep(1000)  // 错误的延迟方式
    tell 结束
""".trimIndent())

// ✅ 正确示例：使用 delay 动作
val correctDelay = ActionAPI.parseAction("""
    tell 开始
    delay 20  // 1秒 = 20刻
    tell 结束
""".trimIndent())
```

### 4. 异步执行

```kotlin
// ❌ 错误示例：阻塞主线程
val wrongAsync = ActionAPI.parseAction("""
    tell 开始下载
    downloadFile()  // 阻塞操作
    tell 下载完成
""".trimIndent())

// ✅ 正确示例：使用异步执行
val correctAsync = ActionAPI.parseAction("""
    tell 开始下载
    async {
        downloadFile()
        tell 下载完成
    }
""".trimIndent())
```

### 5. 声音动作注意事项

```kotlin
// ❌ 错误示例：无效的音效名称
val wrongSound = ActionAPI.parseAction("sound INVALID_SOUND-1.0-1.0")

// ❌ 错误示例：超出范围的音量或音调
val wrongVolume = ActionAPI.parseAction("sound ENTITY_PLAYER_LEVELUP-11.0-1.0")  // 音量超出范围
val wrongPitch = ActionAPI.parseAction("sound ENTITY_PLAYER_LEVELUP-1.0-3.0")    // 音调超出范围

// ✅ 正确示例：使用有效的音效和参数
val correctSound = ActionAPI.parseAction("sound ENTITY_PLAYER_LEVELUP-1.0-1.0")
```

### 6. 标题动作注意事项

```kotlin
// ❌ 错误示例：缺少反引号
val wrongTitle = ActionAPI.parseAction("title 主标题 副标题 10 40 10")

// ❌ 错误示例：无效的时间值
val wrongTiming = ActionAPI.parseAction("title `主标题` `副标题` -1 40 10")  // 负的淡入时间

// ✅ 正确示例：正确的标题格式
val correctTitle = ActionAPI.parseAction("title `主标题` `副标题` 10 40 10")
```

## 🔍 调试技巧

### 1. 动作解析测试

```kotlin
fun testActionParsing() {
    val actions = listOf(
        "tell 测试消息",
        "sound ENTITY_PLAYER_LEVELUP-1.0-1.0",
        "title `测试标题` `测试副标题` 10 40 10",
        "if {permission test} then {tell 有权限} else {tell 无权限}"
    )

    actions.forEach { actionStr ->
        try {
            val action = ActionAPI.parseAction(actionStr)
            println("成功解析动作: $actionStr")
            println("动作类型: ${action.getType()}")
        } catch (e: Exception) {
            println("解析失败: $actionStr")
            println("错误信息: ${e.message}")
        }
    }
}
```

### 2. 条件测试

```kotlin
fun testConditions() {
    val player = Bukkit.getPlayer("test")
    if (player == null) return

    val conditions = listOf(
        "permission example.admin",
        "papi %player_level% >= 10",
        "all [permission example.admin; papi %player_level% >= 10]",
        "any [permission example.user; permission example.guest]"
    )

    conditions.forEach { condition ->
        try {
            val result = ConditionManager.evaluate(player, condition)
            println("条件: $condition")
            println("结果: $result")
        } catch (e: Exception) {
            println("条件测试失败: $condition")
            println("错误信息: ${e.message}")
        }
    }
}
```

### 3. 性能测试

```kotlin
fun testPerformance() {
    val player = Bukkit.getPlayer("test")
    if (player == null) return

    val metrics = ActionMetrics()

    // 测试单个动作
    metrics.measure("单个动作") {
        ActionAPI.parseAction("tell 测试消息").execute(player)
    }

    // 测试条件动作
    metrics.measure("条件动作") {
        ActionAPI.parseAction("""
            if {permission test} then {
                tell 有权限
                sound ENTITY_PLAYER_LEVELUP-1.0-1.0
            } else {
                tell 无权限
                sound ENTITY_VILLAGER_NO-1.0-1.0
            }
        """.trimIndent()).execute(player)
    }

    // 输出结果
    metrics.printResults()
}
```

## 📚 相关 API

- `ActionAPI` - 动作系统核心 API
- `ActionParser` - 动作解析器
- `ConditionalActionParser` - 条件动作解析器
- `ActionGroup` - 动作组合
- `ActionMetrics` - 动作性能指标

## ⚠️ 注意事项

1. 动作字符串必须符合指定格式
2. 条件表达式必须使用正确的语法
3. 延迟执行使用游戏刻而不是毫秒
4. 异步操作中不能直接操作主线程
5. 注意动作执行的顺序
6. 合理使用动作组合
7. 声音动作的音量和音调必须在有效范围内
8. 标题动作必须使用反引号包裹文本
9. 所有时间相关的参数都使用游戏刻作为单位

## 🔄 更新日志

- 版本 1.0.0 (2025-06-01)
  - 初始版本发布
  - 实现基础动作系统
  - 添加条件动作支持
  - 添加动作组合功能
  - 支持异步执行
  - 添加性能监控
  - 添加声音动作参数验证
  - 添加标题动作格式化支持
