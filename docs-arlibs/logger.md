---
sidebar_position: 2
---

# 日志系统 API 指南 📝

> 简单而强大的日志系统，支持颜色格式化和调试模式

## 📖 简介

ArLibs 的日志系统提供了以下功能：

- 自动插件上下文检测
- 颜色代码支持
- 调试模式配置
- 多级别日志记录
- 线程安全的日志处理

## 🎯 快速开始

### 1. 初始化日志系统

```kotlin
// 启用调试模式
Logger.init(true)

// 禁用调试模式
Logger.init(false)
```

### 2. 基本日志记录

```kotlin
// 信息日志
Logger.info("这是一条信息日志")

// 警告日志
Logger.warn("这是一条警告日志")

// 错误日志
Logger.severe("这是一条错误日志")

// 调试日志（仅在调试模式启用时显示）
Logger.debug("这是一条调试日志")
```

### 3. 带颜色的日志

```kotlin
// 使用颜色代码
Logger.info("&a成功 &e警告 &c错误")

// 使用十六进制颜色
Logger.info("<#FF0000>红色文本</#FF0000>")

// 使用渐变效果
Logger.info("<gradient:#FF0000:#00FF00>渐变文本</gradient>")
```

## 🔧 API 详解

### 1. 日志级别

```kotlin
// 信息级别 - 用于一般信息
Logger.info("插件已加载")

// 警告级别 - 用于潜在问题
Logger.warn("配置文件未找到，使用默认配置")

// 错误级别 - 用于严重问题
Logger.severe("无法连接到数据库")

// 调试级别 - 用于开发调试
Logger.debug("正在处理玩家数据...")
```

### 2. 调试模式

```kotlin
// 启用调试模式
Logger.init(true)
Logger.debug("这条消息会显示")

// 禁用调试模式
Logger.init(false)
Logger.debug("这条消息不会显示")
```

### 3. 异常处理

```kotlin
try {
    // 可能抛出异常的代码
    throw Exception("测试异常")
} catch (e: Exception) {
    // 记录异常信息
    Logger.severe("发生错误: ${e.message}")
    Logger.debug("详细错误信息: ${e.stackTraceToString()}")
}
```

## ⚠️ 注意事项

### 1. 初始化

```kotlin
// ❌ 错误示例：未初始化就使用
Logger.info("这条消息可能没有插件前缀")

// ✅ 正确示例：先初始化
Logger.init(true)
Logger.info("这条消息会带有插件前缀")
```

### 2. 调试模式

```kotlin
// ❌ 错误示例：频繁切换调试模式
fun someFunction() {
    Logger.init(true)  // 不应该在函数中切换调试模式
    Logger.debug("调试信息")
    Logger.init(false)
}

// ✅ 正确示例：在插件启动时设置一次
class MyPlugin : JavaPlugin() {
    override fun onEnable() {
        Logger.init(debugMode)  // 从配置读取
    }
}
```

### 3. 颜色代码

```kotlin
// ❌ 错误示例：使用无效的颜色代码
Logger.info("&x无效的颜色代码")  // 无效的格式

// ✅ 正确示例：使用有效的颜色代码
Logger.info("&a绿色文本 &c红色文本")
```

## 🔍 调试技巧

### 1. 日志测试

```kotlin
fun testLogging() {
    val testCases = listOf(
        "普通文本",
        "&a带颜色的文本",
        "<#FF0000>十六进制颜色</#FF0000>",
        "<gradient:#FF0000:#00FF00>渐变文本</gradient>"
    )

    testCases.forEach { message ->
        try {
            Logger.info(message)
            Logger.debug("调试: $message")
        } catch (e: Exception) {
            println("日志记录失败: $message")
            println("错误信息: ${e.message}")
        }
    }
}
```

### 2. 性能测试

```kotlin
fun testPerformance() {
    val startTime = System.currentTimeMillis()

    // 测试大量日志记录
    repeat(1000) { i ->
        Logger.info("测试日志 $i")
        Logger.debug("调试信息 $i")
    }

    val endTime = System.currentTimeMillis()
    println("日志记录耗时: ${endTime - startTime}ms")
}
```

### 3. 异常堆栈跟踪

```kotlin
fun testExceptionLogging() {
    try {
        // 模拟异常
        throw Exception("测试异常")
    } catch (e: Exception) {
        // 记录异常信息
        Logger.severe("发生错误: ${e.message}")

        // 记录详细堆栈
        Logger.debug("""
            异常堆栈:
            ${e.stackTraceToString()}
        """.trimIndent())
    }
}
```

## 📚 相关 API

- `Logger.init()` - 初始化日志系统
- `Logger.info()` - 记录信息日志
- `Logger.warn()` - 记录警告日志
- `Logger.severe()` - 记录错误日志
- `Logger.debug()` - 记录调试日志

## ⚠️ 注意事项

1. 必须在插件启动时初始化日志系统
2. 调试模式应该从配置文件读取
3. 避免在循环中频繁切换调试模式
4. 使用适当的日志级别
5. 异常信息应该包含足够的上下文

## 🔄 更新日志

- 版本 1.0.0 (2025-05-18)
  - 初始版本发布
  - 支持自动插件上下文检测
  - 支持颜色代码处理
  - 添加调试模式
  - 实现多级别日志记录
  - 添加线程安全支持
