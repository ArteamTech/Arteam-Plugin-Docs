# 命令模块 API 指南 🎮

> 通过注解和 API 轻松创建强大的命令系统

## 📖 简介

ArLibs 的命令模块提供了一个基于注解的命令系统，让开发者能够快速创建和管理命令。它支持：

- 基于注解的命令注册
- 子命令系统
- 权限控制
- Tab 补全
- 命令执行器控制

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
    name: String,                    // 命令名称
    description: String = "",        // 命令描述
    usage: String = "",             // 使用说明
    permission: String = "",        // 权限节点
    permissionDefault: PermissionDefault = PermissionDefault.OP,  // 默认权限
    executor: CommandExecutor = CommandExecutor.ALL  // 执行器类型
)
```

#### @SubCommand

```kotlin
@SubCommand(
    name: String,                    // 子命令名称
    aliases: Array<String> = [],     // 别名列表
    description: String = "",        // 子命令描述
    usage: String = "",             // 使用说明
    minArgs: Int = 0,               // 最小参数数量
    maxArgs: Int = -1,              // 最大参数数量
    permission: String = "",        // 权限节点
    executor: CommandExecutor = CommandExecutor.ALL  // 执行器类型
)
```

### 命令上下文

`CommandContext` 类提供了丰富的命令执行上下文信息：

```kotlin
class CommandContext(
    val sender: CommandSender,      // 命令发送者
    val args: List<String>,         // 命令参数
    val label: String,              // 命令标签
    val plugin: Plugin              // 插件实例
) {
    fun getArg(index: Int): String?  // 获取指定索引的参数
    fun getPlayer(): Player?         // 获取命令执行者（如果是玩家）
    fun hasPermission(permission: String): Boolean  // 检查权限
    fun send(vararg messages: String)  // 发送消息
    fun sendError(message: String)     // 发送错误消息
    fun sendSuccess(message: String)   // 发送成功消息
}
```

### 命令结果

```kotlin
enum class CommandResult {
    SUCCESS,    // 命令执行成功
    ERROR,      // 命令执行出错
    USAGE       // 显示命令用法
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
class AdminCommand : BaseCommand() {

    @SubCommand(
        name = "reload",
        description = "重载配置",
        permission = "myplugin.admin.reload"
    )
    fun reloadConfig(context: CommandContext): CommandResult {
        // 重载配置逻辑
        return CommandResult.SUCCESS
    }
}
```

### 3. Tab 补全示例

```kotlin
@TabComplete(subCommand = "teleport", argument = 0)
fun teleportTabComplete(context: CommandContext): List<String> {
    return Bukkit.getOnlinePlayers()
        .map { it.name }
        .filter { it.startsWith(context.args.lastOrNull() ?: "") }
}
```

## 💡 最佳实践

1. **命令组织**

   - 将相关命令组织在同一个类中
   - 使用有意义的类名和命令名
   - 为每个命令添加清晰的描述

2. **权限管理**

   - 使用合理的权限节点结构
   - 为每个子命令设置独立的权限
   - 使用 `PermissionDefault` 控制默认权限

3. **错误处理**

   - 始终检查参数有效性
   - 使用 `CommandResult` 返回适当的执行结果
   - 提供清晰的错误消息

4. **用户体验**
   - 添加详细的命令用法说明
   - 实现智能的 Tab 补全
   - 使用颜色代码美化输出

## 🔍 调试技巧

1. 使用 `CommandAPI.getCommandInfo()` 查看命令注册信息
2. 开启调试模式查看详细日志
3. 使用 `CommandContext` 的调试方法输出中间状态

## 📚 相关 API

- `CommandAPI` - 命令系统核心 API
- `CommandManager` - 命令管理器
- `CommandInfo` - 命令信息类
- `BaseCommand` - 命令基类

## ⚠️ 注意事项

1. 命令名称不能包含空格
2. 子命令的权限节点会自动继承主命令的权限
3. 确保正确处理异步操作
4. 注意命令执行器的限制
