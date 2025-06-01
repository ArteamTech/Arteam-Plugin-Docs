# 命令模块 API 指南 🎮

> 基于注解的命令系统，让命令开发变得简单而强大

## 📖 简介

ArLibs 的命令模块提供了一个基于注解的命令系统，让开发者能够轻松创建和管理命令。它支持：

- 基于注解的命令定义 📝
- 子命令系统 🔄
- 权限控制 🛡️
- Tab 补全 ⌨️
- 异步执行 ⚡
- 参数验证 ✅
- 命令执行者限制 👥

## 🎯 快速开始

### 1. 创建基础命令

```kotlin
@Command(
    name = "example",
    description = "示例命令",
    usage = "/example <subcommand>"
)
class ExampleCommand : BaseCommand() {
    override fun execute(context: CommandContext): CommandResult {
        send("&a这是一个示例命令")
        return CommandResult.SUCCESS
    }
}
```

### 2. 添加子命令

```kotlin
@Command(name = "player")
class PlayerCommand : BaseCommand() {
    override fun execute(context: CommandContext): CommandResult {
        send("&7使用 /player <subcommand> 查看可用子命令")
        return CommandResult.SUCCESS
    }

    @SubCommand(
        name = "info",
        description = "查看玩家信息",
        minArgs = 1
    )
    fun infoCommand(context: CommandContext): CommandResult {
        val playerName = context.args[0]
        val player = Bukkit.getPlayer(playerName)

        if (player == null) {
            return sendError("玩家 $playerName 不在线").let { CommandResult.ERROR }
        }

        send(
            "&6玩家信息:",
            "&7• 名称: &e${player.name}",
            "&7• 等级: &e${player.level}",
            "&7• 生命值: &e${player.health}/${player.maxHealth}"
        )
        return CommandResult.SUCCESS
    }
}
```

## 🔧 API 详解

### 命令注解

#### @Command

```kotlin
@Command(
    name: String = "",              // 命令名称
    aliases: Array<String> = [],    // 命令别名
    description: String = "",       // 命令描述
    usage: String = "",            // 使用说明
    executor: CommandExecutor = CommandExecutor.ALL,  // 执行者限制
    minArgs: Int = 0,              // 最少参数
    maxArgs: Int = -1,             // 最多参数
    async: Boolean = false         // 是否异步执行
)
```

#### @SubCommand

```kotlin
@SubCommand(
    name: String = "",             // 子命令名称
    aliases: Array<String> = [],   // 子命令别名
    description: String = "",      // 子命令描述
    usage: String = "",           // 使用说明
    executor: CommandExecutor = CommandExecutor.ALL,  // 执行者限制
    minArgs: Int = 0,             // 最少参数
    maxArgs: Int = -1,            // 最多参数
    async: Boolean = false        // 是否异步执行
)
```

#### @Permission

```kotlin
@Permission(
    value: String,                 // 权限节点
    defaultValue: PermissionDefault = PermissionDefault.FALSE  // 默认权限
)
```

#### @TabComplete

```kotlin
@TabComplete(
    subCommand: String = "",       // 子命令名称
    argument: Int = 0,            // 参数索引
    priority: Int = 0             // 优先级
)
```

## ⚠️ 注意事项

### 1. 命令类定义

```kotlin
// ❌ 错误示例：未继承 BaseCommand
@Command(name = "error")
class ErrorCommand {
    fun execute(context: CommandContext): CommandResult {
        return CommandResult.SUCCESS
    }
}

// ✅ 正确示例：继承 BaseCommand
@Command(name = "correct")
class CorrectCommand : BaseCommand() {
    override fun execute(context: CommandContext): CommandResult {
        return CommandResult.SUCCESS
    }
}
```

### 2. 子命令定义

```kotlin
@Command(name = "subcommand")
class SubCommandExample : BaseCommand() {
    // ❌ 错误示例：错误的返回类型
    @SubCommand(name = "error")
    fun errorCommand(context: CommandContext): String {
        return "错误"
    }

    // ✅ 正确示例：正确的返回类型
    @SubCommand(name = "correct")
    fun correctCommand(context: CommandContext): CommandResult {
        return CommandResult.SUCCESS
    }
}
```

### 3. 权限控制

```kotlin
@Command(name = "permission")
class PermissionExample : BaseCommand() {
    // ❌ 错误示例：缺少权限检查
    @SubCommand(name = "admin")
    fun adminCommand(context: CommandContext): CommandResult {
        // 直接执行管理员命令
        return CommandResult.SUCCESS
    }

    // ✅ 正确示例：使用权限注解
    @SubCommand(name = "admin")
    @Permission("example.admin")
    fun adminCommand(context: CommandContext): CommandResult {
        // 只有有权限的玩家才能执行
        return CommandResult.SUCCESS
    }
}
```

### 4. 参数验证

```kotlin
@Command(name = "validation")
class ValidationExample : BaseCommand() {
    // ❌ 错误示例：未验证参数
    @SubCommand(name = "teleport")
    fun teleportCommand(context: CommandContext): CommandResult {
        val x = context.args[0].toDouble()
        val y = context.args[1].toDouble()
        val z = context.args[2].toDouble()
        // 可能抛出异常
        return CommandResult.SUCCESS
    }

    // ✅ 正确示例：参数验证
    @SubCommand(
        name = "teleport",
        minArgs = 3,
        maxArgs = 3
    )
    fun teleportCommand(context: CommandContext): CommandResult {
        return try {
            val x = context.args[0].toDouble()
            val y = context.args[1].toDouble()
            val z = context.args[2].toDouble()
            // 安全地使用参数
            CommandResult.SUCCESS
        } catch (e: NumberFormatException) {
            sendError("坐标必须是数字")
            CommandResult.ERROR
        }
    }
}
```

### 5. 异步执行

```kotlin
@Command(name = "async")
class AsyncExample : BaseCommand() {
    // ❌ 错误示例：同步执行耗时操作
    @SubCommand(name = "sync")
    fun syncCommand(context: CommandContext): CommandResult {
        // 可能阻塞主线程
        Thread.sleep(5000)
        return CommandResult.SUCCESS
    }

    // ✅ 正确示例：异步执行
    @SubCommand(
        name = "async",
        async = true
    )
    fun asyncCommand(context: CommandContext): CommandResult {
        // 在异步线程中执行
        Thread.sleep(5000)
        return CommandResult.SUCCESS
    }
}
```

### 6. Tab 补全

```kotlin
@Command(name = "tab")
class TabExample : BaseCommand() {
    // ❌ 错误示例：未实现 Tab 补全
    @SubCommand(name = "player")
    fun playerCommand(context: CommandContext): CommandResult {
        return CommandResult.SUCCESS
    }

    // ✅ 正确示例：实现 Tab 补全
    @SubCommand(name = "player")
    fun playerCommand(context: CommandContext): CommandResult {
        return CommandResult.SUCCESS
    }

    @TabComplete(subCommand = "player", argument = 0)
    fun playerTabComplete(context: CommandContext): List<String> {
        return Bukkit.getOnlinePlayers()
            .map { it.name }
            .filter { it.startsWith(context.args.lastOrNull() ?: "") }
    }
}
```

## 🔍 调试技巧

### 1. 命令注册检查

```kotlin
fun checkCommandRegistration() {
    val commands = CommandAPI.getAllCommands()

    // 打印所有注册的命令
    commands.forEach { (name, info) ->
        println("命令: $name")
        println("描述: ${info.description}")
        println("子命令数量: ${info.subCommands.size}")
        println("权限: ${info.permission}")
        println("---")
    }
}
```

### 2. 权限测试

```kotlin
fun testPermissions() {
    val player = Bukkit.getPlayer("test")
    if (player == null) return

    // 测试权限
    val permissions = listOf(
        "example.admin",
        "example.user",
        "example.guest"
    )

    permissions.forEach { permission ->
        val hasPermission = player.hasPermission(permission)
        println("权限 $permission: ${if (hasPermission) "有" else "无"}")
    }
}
```

### 3. 参数解析测试

```kotlin
fun testArgumentParsing() {
    val context = CommandContext(
        sender = Bukkit.getConsoleSender(),
        args = arrayOf("123", "abc", "true")
    )

    // 测试参数解析
    try {
        val number = context.args[0].toInt()
        val text = context.args[1]
        val bool = context.args[2].toBoolean()

        println("解析结果:")
        println("数字: $number")
        println("文本: $text")
        println("布尔: $bool")
    } catch (e: Exception) {
        println("解析错误: ${e.message}")
    }
}
```

## 📚 相关 API

- `CommandAPI` - 命令系统核心 API
- `CommandManager` - 命令管理器
- `CommandContext` - 命令上下文
- `CommandResult` - 命令执行结果

## ⚠️ 注意事项

1. 命令类必须继承 `BaseCommand`
2. 子命令方法必须返回 `CommandResult`
3. 异步命令中不能直接操作主线程
4. 注意权限节点的命名规范
5. 正确处理命令执行者限制
6. 实现适当的 Tab 补全

## 🔄 更新日志

- 版本 1.0.0 (2025-05-25)
  - 初始版本发布
  - 实现基础命令系统
  - 添加子命令支持
  - 添加权限控制
  - 添加 Tab 补全
  - 支持异步执行
