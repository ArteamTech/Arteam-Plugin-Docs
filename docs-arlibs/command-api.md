# 命令模块 API 指南 🎮

> 通过注解和 API 轻松创建强大的命令系统

## 📖 简介

ArLibs 的命令模块提供了一个基于注解的命令系统，让开发者能够快速创建和管理命令。它支持：

- 基于注解的命令注册
- 子命令系统
- 权限控制
- Tab 补全
- 命令执行器控制
- 异步命令执行

## 🎯 快速开始

### 1. 创建基础命令类

```kotlin
@Command(
    name = "mycommand",
    description = "我的命令描述",
    usage = "/mycommand <参数>"
)
class MyCommand : BaseCommand() {

    override fun execute(context: CommandContext): CommandResult {
        // 命令执行逻辑
        return CommandResult.SUCCESS
    }
}
```

### 2. 添加子命令

```kotlin
@SubCommand(
    name = "subcommand",
    aliases = ["sc", "sub"],
    description = "子命令描述",
    minArgs = 1,
    maxArgs = 3
)
fun subCommand(context: CommandContext): CommandResult {
    // 子命令执行逻辑
    return CommandResult.SUCCESS
}
```

## 🔧 API 详解

### 命令注解

#### @Command

```kotlin
@Command(
    name: String = "",              // 命令名称，为空时使用小写的类名
    aliases: Array<String> = [],    // 命令别名
    description: String = "",       // 命令描述
    usage: String = "",            // 使用说明，为空时自动生成
    executor: CommandExecutor = CommandExecutor.ALL,  // 执行器类型
    minArgs: Int = 0,              // 最小参数数量
    maxArgs: Int = -1,             // 最大参数数量，-1表示无限制
    async: Boolean = false         // 是否异步执行
)
```

#### @SubCommand

```kotlin
@SubCommand(
    name: String = "",              // 子命令名称，为空时使用方法名
    aliases: Array<String> = [],    // 子命令别名
    description: String = "",       // 子命令描述
    usage: String = "",            // 使用说明，为空时自动生成
    executor: CommandExecutor = CommandExecutor.ALL,  // 执行器类型
    minArgs: Int = 0,              // 最小参数数量
    maxArgs: Int = -1,             // 最大参数数量，-1表示无限制
    async: Boolean = false         // 是否异步执行
)
```

#### @Permission

```kotlin
@Permission(
    value: String,                  // 权限节点
    op: Boolean = true,            // 操作员是否绕过权限检查
    defaultValue: PermissionDefault = PermissionDefault.FALSE,  // 默认权限值
    message: String = "",          // 权限被拒绝时的自定义消息
    silent: Boolean = false        // 是否禁止显示权限被拒绝的消息
)
```

#### @TabComplete

```kotlin
@TabComplete(
    command: String = "",           // 适用的命令名称，为空时适用于主命令
    subCommand: String = "",        // 适用的子命令名称，为空时适用于所有子命令
    argument: Int = -1,            // 适用的参数位置，-1表示所有位置
    priority: Int = 0,             // 优先级，数值越高优先级越高
    permission: String = "",       // 查看Tab补全所需的权限
    staticValues: Array<String> = []  // 用于Tab补全的静态值
)
```

### 命令执行器类型

```kotlin
enum class CommandExecutor {
    ALL,      // 任何人都可以执行（玩家和控制台）
    PLAYER,   // 仅玩家可以执行
    CONSOLE   // 仅控制台可以执行
}
```

### 默认权限类型

```kotlin
enum class PermissionDefault {
    TRUE,     // 默认授予权限
    FALSE,    // 默认拒绝权限
    OP,       // 仅授予操作员权限
    NOT_OP    // 仅授予非操作员权限
}
```

## 📝 使用示例

### 1. 基础命令示例

```kotlin
@Command(
    name = "teleport",
    description = "传送命令",
    usage = "/teleport <玩家> [目标玩家]"
)
class TeleportCommand : BaseCommand() {

    @SubCommand(
        name = "here",
        description = "将目标玩家传送到自己身边",
        minArgs = 1,
        maxArgs = 1
    )
    fun teleportHere(context: CommandContext): CommandResult {
        val target = Bukkit.getPlayer(context.args[0])
        if (target == null) {
            return context.sendError("玩家不存在").let { CommandResult.ERROR }
        }

        target.teleport(context.getPlayer()?.location ?: return CommandResult.ERROR)
        return context.sendSuccess("已将 ${target.name} 传送到你身边").let { CommandResult.SUCCESS }
    }
}
```

### 2. 带权限的命令示例

```kotlin
@Command(
    name = "admin",
    description = "管理员命令",
    permission = "myplugin.admin"
)
@Permission(
    value = "myplugin.admin",
    op = true,
    defaultValue = PermissionDefault.OP,
    message = "&c你没有权限使用此命令！"
)
class AdminCommand : BaseCommand() {

    @SubCommand(
        name = "reload",
        description = "重载配置",
        permission = "myplugin.admin.reload"
    )
    @Permission(
        value = "myplugin.admin.reload",
        op = true,
        defaultValue = PermissionDefault.OP,
        message = "&c你没有权限重载配置！"
    )
    fun reloadConfig(context: CommandContext): CommandResult {
        // 重载配置逻辑
        return CommandResult.SUCCESS
    }
}
```

### 3. 异步命令示例

```kotlin
@Command(
    name = "async",
    description = "异步命令示例",
    async = true
)
class AsyncCommand : BaseCommand() {

    @SubCommand(
        name = "download",
        description = "异步下载文件",
        minArgs = 1,
        async = true
    )
    fun downloadFile(context: CommandContext): CommandResult {
        val url = context.args[0]
        context.send("&a开始下载文件...")

        // 异步下载逻辑
        Bukkit.getScheduler().runTaskAsynchronously(plugin) {
            try {
                // 下载文件
                context.send("&a文件下载完成！")
            } catch (e: Exception) {
                context.sendError("下载失败：${e.message}")
            }
        }

        return CommandResult.SUCCESS
    }
}
```

### 4. 高级 Tab 补全示例

```kotlin
@Command(name = "advanced")
class AdvancedCommand : BaseCommand() {

    @SubCommand(name = "teleport")
    fun teleport(context: CommandContext): CommandResult {
        // 传送逻辑
        return CommandResult.SUCCESS
    }

    // 为第一个参数提供在线玩家列表
    @TabComplete(
        subCommand = "teleport",
        argument = 0,
        priority = 1
    )
    fun teleportPlayerTabComplete(context: CommandContext): List<String> {
        return Bukkit.getOnlinePlayers()
            .map { it.name }
            .filter { it.startsWith(context.args.lastOrNull() ?: "") }
    }

    // 为第二个参数提供世界列表
    @TabComplete(
        subCommand = "teleport",
        argument = 1,
        priority = 2
    )
    fun teleportWorldTabComplete(context: CommandContext): List<String> {
        return Bukkit.getWorlds()
            .map { it.name }
            .filter { it.startsWith(context.args.lastOrNull() ?: "") }
    }

    // 提供静态值作为备选
    @TabComplete(
        subCommand = "teleport",
        argument = 1,
        priority = 0,
        staticValues = ["spawn", "home", "bed"]
    )
    fun teleportStaticTabComplete(context: CommandContext): List<String> {
        return listOf("spawn", "home", "bed")
    }
}
```

## 💡 最佳实践

1. **命令组织**

   - 将相关命令组织在同一个类中
   - 使用有意义的类名和命令名
   - 为每个命令添加清晰的描述
   - 合理使用异步执行提高性能

2. **权限管理**

   - 使用合理的权限节点结构
   - 为每个子命令设置独立的权限
   - 使用 `PermissionDefault` 控制默认权限
   - 提供友好的权限提示消息

3. **错误处理**

   - 始终检查参数有效性
   - 使用 `CommandResult` 返回适当的执行结果
   - 提供清晰的错误消息
   - 正确处理异步操作中的异常

4. **用户体验**
   - 添加详细的命令用法说明
   - 实现智能的 Tab 补全
   - 使用颜色代码美化输出
   - 提供进度反馈（特别是异步操作）

## 🔍 调试技巧

1. 使用 `CommandAPI.getCommandInfo()` 查看命令注册信息
2. 开启调试模式查看详细日志
3. 使用 `CommandContext` 的调试方法输出中间状态
4. 使用 `@Permission(silent = true)` 临时禁用权限消息进行测试

## 📚 相关 API

- `CommandAPI` - 命令系统核心 API
- `CommandManager` - 命令管理器
- `CommandInfo` - 命令信息类
- `BaseCommand` - 命令基类
- `CommandContext` - 命令上下文
- `CommandResult` - 命令执行结果

## ⚠️ 注意事项

1. 命令名称不能包含空格
2. 子命令的权限节点会自动继承主命令的权限
3. 确保正确处理异步操作
4. 注意命令执行器的限制
5. Tab 补全的优先级会影响显示顺序
6. 异步命令中不能直接操作主线程资源
7. 权限检查的顺序：操作员权限 > 具体权限 > 默认权限

## 🔄 更新日志

- 版本 1.0.0 (2025-05-25)
  - 初始版本发布
  - 实现基础命令系统
  - 添加权限控制功能
  - 集成 Tab 补全系统
  - 支持异步命令执行
