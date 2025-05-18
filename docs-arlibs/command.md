---
sidebar_position: 7
---

# 命令模块

:::note 开发中
命令模块目前正在开发中，此文档是对计划功能的预览。
:::

ArLibs 的命令模块将简化命令注册和处理流程，提供注解驱动的命令系统，支持自动 Tab 补全、参数类型转换和权限控制。

## 计划特性

- **注解驱动** - 使用注解定义命令、子命令和参数
- **自动类型转换** - 自动将字符串参数转换为所需类型
- **Tab 补全** - 自动生成或自定义 Tab 补全
- **权限控制** - 集成的权限检查系统
- **帮助生成** - 自动生成命令帮助信息
- **别名支持** - 支持命令别名
- **冷却时间** - 命令使用冷却时间控制
- **参数验证** - 自动验证参数有效性
- **上下文注入** - 自动注入命令执行上下文

## 预期用法

以下是命令模块计划支持的用法示例：

### 基本命令定义

```kotlin
// 注册命令管理器
val commandManager = CommandManager.init(plugin)

// 创建基本命令类
@Command("economy", aliases = ["eco"], description = "经济系统命令")
class EconomyCommand {
    
    @SubCommand("balance", aliases = ["bal"], permission = "economy.balance")
    fun checkBalance(player: Player) {
        // 检查自己的余额
        player.sendMessage("你的余额: 1000")
    }
    
    @SubCommand("balance", aliases = ["bal"], permission = "economy.balance.others")
    fun checkOtherBalance(player: Player, @Argument("player") target: Player) {
        // 检查他人的余额
        player.sendMessage("${target.name} 的余额: 1000")
    }
    
    @SubCommand("pay", permission = "economy.pay")
    fun pay(
        player: Player, 
        @Argument("player") target: Player, 
        @Argument("amount") @Min(1.0) amount: Double
    ) {
        // 转账给其他玩家
        player.sendMessage("你向 ${target.name} 转账了 $amount")
    }
    
    @SubCommand("help")
    fun help(sender: CommandSender) {
        // 显示帮助信息
        // 命令模块会自动生成并发送帮助信息
    }
}

// 注册命令
commandManager.register(EconomyCommand())
```

### 自定义 Tab 补全

```kotlin
@Command("server")
class ServerCommand {
    
    @SubCommand("teleport", aliases = ["tp"])
    fun teleport(
        player: Player,
        @Argument("server") @TabComplete("getServerList") server: String
    ) {
        // 传送玩家到指定服务器
        player.sendMessage("正在将你传送到服务器: $server")
    }
    
    // 自定义 Tab 补全提供方法
    @TabCompleter("getServerList")
    fun getServerList(sender: CommandSender): List<String> {
        return listOf("lobby", "survival", "creative", "skyblock")
    }
    
    @SubCommand("message", aliases = ["msg"])
    fun broadcast(
        sender: CommandSender,
        @Argument("server") @TabComplete("getServerList") server: String,
        @Argument("message", joinRemaining = true) message: String
    ) {
        // 向指定服务器广播消息
        sender.sendMessage("消息已发送到 $server: $message")
    }
}
```

### 高级功能

#### 冷却时间

```kotlin
@Command("kit")
class KitCommand {
    
    @SubCommand("daily")
    @Cooldown(time = 86400, timeUnit = TimeUnit.SECONDS, message = "你必须等待 %remaining% 才能再次使用此命令")
    fun dailyKit(player: Player) {
        // 给予玩家每日礼包
        player.sendMessage("你领取了每日礼包!")
    }
}
```

#### 确认命令

```kotlin
@Command("admin")
class AdminCommand {
    
    @SubCommand("reset")
    @Confirm(message = "你确定要重置所有数据吗? 输入 /admin confirm 确认")
    fun resetData(sender: CommandSender) {
        // 重置数据
        sender.sendMessage("所有数据已重置!")
    }
}
```

#### 上下文注入

```kotlin
@Command("plugin")
class PluginCommand {
    
    @SubCommand("reload")
    fun reload(
        sender: CommandSender,
        @Context plugin: JavaPlugin,
        @Context("commandLabel") label: String
    ) {
        // 重载插件
        sender.sendMessage("正在重载插件...")
        // 执行重载逻辑
        sender.sendMessage("插件重载完成! 命令: /$label")
    }
}
```

### 命令帮助生成

命令模块将自动为注册的命令生成帮助信息：

```kotlin
@Command("example", description = "示例命令")
class ExampleCommand {
    
    @DefaultCommand
    @HelpCommand
    fun defaultHelp(sender: CommandSender) {
        // 当用户只输入 /example 时调用此方法
        // 命令模块会自动生成并发送帮助信息
    }
    
    @SubCommand("test", description = "测试子命令")
    fun test(sender: CommandSender) {
        sender.sendMessage("这是一个测试命令")
    }
}
```

输出结果：

```
----- Example 命令帮助 -----
/example test - 测试子命令
/example help - 显示此帮助信息
```

## 计划时间线

命令模块预计将在 ArLibs 的未来版本中实现，基本功能包括：

1. 注解驱动的命令注册
2. 基本的参数类型转换
3. 简单的 Tab 补全支持
4. 权限控制

高级功能如冷却时间、确认命令、上下文注入和帮助生成将在后续版本中逐步添加。