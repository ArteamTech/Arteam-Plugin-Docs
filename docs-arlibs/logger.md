---
sidebar_position: 2
---

# 日志系统

ArLibs 提供了一个增强的日志系统，扩展了 Bukkit 的默认日志功能，支持彩色输出、多插件兼容和异步日志记录。

## 主要特性

- **彩色输出** - 支持 Minecraft 颜色代码和高级颜色格式
- **异步日志** - 防止日志操作阻塞主线程
- **多级别日志** - 支持 INFO、WARNING、SEVERE 和 DEBUG 级别
- **多插件兼容** - 使用 ThreadLocal 确保在多插件环境中正确识别日志来源

## 基本用法

### 初始化

在使用日志系统之前，必须先进行初始化，通常在插件的 `onEnable()` 方法中：

```kotlin
// 初始化日志系统
Logger.init(this, debug = false)
```

参数说明：
- `plugin` - 插件实例，用于标识日志来源
- `debug` - 是否启用调试模式，默认为 false

### 记录日志

```kotlin
// 记录信息级别日志
Logger.info("插件启动成功!")

// 记录警告级别日志
Logger.warn("配置文件缺少必要的设置")

// 记录严重错误级别日志
Logger.severe("无法连接到数据库!")

// 记录调试信息 (仅在调试模式开启时显示)
Logger.debug("玩家数据加载完成: ${player.name}")
```

### 支持颜色代码

日志系统支持 Minecraft 颜色代码和 ArLibs 的 ColorUtil 支持的所有高级颜色格式：

```kotlin
// 基本颜色代码
Logger.info("&a这是绿色文本 &b这是蓝绿色文本 &c这是红色文本")

// 十六进制颜色
Logger.info("<#FF5733>这是自定义颜色文本")

// 渐变色
Logger.info("<gradient:#FF5733:#3399FF>这是渐变文本</gradient>")

// 彩虹效果
Logger.info("<rainbow>这是彩虹文本</rainbow>")
```

### 关闭日志系统

在插件禁用时，应当关闭日志系统以释放资源：

```kotlin
override fun onDisable() {
    // 其他清理操作...
    
    Logger.info("插件已禁用")
    Logger.close() // 关闭日志系统并释放资源
}
```

## 高级用法

### 异步日志处理

日志系统默认使用单线程执行器来处理非主线程的日志请求，避免阻塞主线程：

```kotlin
// 在异步线程中记录日志
Bukkit.getScheduler().runTaskAsynchronously(plugin, Runnable {
    // 这些日志将在日志线程池中处理，而不是在当前的异步线程
    Logger.info("正在执行异步操作...")
    
    // 严重错误总是同步记录，以确保立即引起注意
    Logger.severe("发生严重错误!") 
})
```

### 在多插件环境中使用

如果你在开发多个使用 ArLibs 的插件，每个插件应该单独初始化日志系统：

```kotlin
// 在插件 A 中
class PluginA : JavaPlugin() {
    override fun onEnable() {
        Logger.init(this, debug = true)
        Logger.info("插件 A 已启动") // 日志将显示为 [PluginA] 插件 A 已启动
    }
}

// 在插件 B 中
class PluginB : JavaPlugin() {
    override fun onEnable() {
        Logger.init(this)
        Logger.info("插件 B 已启动") // 日志将显示为 [PluginB] 插件 B 已启动
    }
}
```

## 实现细节

以下是日志系统的实现细节，适合有兴趣深入了解其工作原理的开发者：

- 使用 `ThreadLocal` 存储插件上下文，确保在多线程环境中正确识别日志来源
- 使用单线程执行器 (`ExecutorService`) 处理异步日志请求，避免竞态条件
- 通过 `Bukkit.getConsoleSender()` 输出日志，确保颜色代码正确显示
- 严重错误始终同步记录，确保立即引起注意
- 集成 `ColorUtil` 处理各种颜色格式 