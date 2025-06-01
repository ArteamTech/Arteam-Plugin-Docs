---
sidebar_position: 8
---

# ArLibs 使用指南 🚀

> 一个强大的 Minecraft 插件开发工具库，让开发变得更简单！

## 📖 简介

ArLibs 是一个专为 Minecraft 插件开发者打造的基础工具库。它提供了丰富的开发工具和 API，包括：

- 基于注解的命令系统
- 高级配置管理
- 颜色处理工具
- 增强的日志系统
- 动作表达式系统
- 条件表达式系统

## 🎮 基础命令

### 主命令

```
/arlibs
```

执行主命令会显示 ArLibs 的基本信息，包括版本号、作者和主要功能。

### 帮助命令

```
/arlibs help [子命令名]
```

- 不带参数：显示所有可用命令列表
- 带子命令名：显示特定子命令的详细帮助信息

### 信息命令

```
/arlibs info
```

显示详细的系统信息，包括：

- 插件版本信息
- 服务器信息
- 已注册命令统计
- 配置状态

### 命令列表

```
/arlibs commands [插件名]
```

- 不带参数：显示所有通过 ArLibs 注册的命令
- 带插件名：显示特定插件的命令列表

## ⚙️ 管理命令

### 重载配置

```
/arlibs reload
```

重新加载 ArLibs 的配置文件。需要 `arlibs.command.reload` 权限。

### 调试模式

```
/arlibs debug
```

切换调试模式开关。需要 `arlibs.command.debug` 权限。

### 版本信息

```
/arlibs version
```

显示详细的版本信息，包括：

- 插件版本
- 作者信息
- API 版本
- 调试信息（需要权限）

## 🎯 高级功能

### 动作表达式

```
/arlibs action <表达式>
```

直接执行动作表达式。支持以下格式：

- `tell <消息>` - 发送消息
- `sound <音效>-<音量>-<音调>` - 播放音效
- `if {条件} then {动作} [else {动作}]` - 条件执行
- `delay <游戏刻>` - 延迟执行
- `command <命令>` - 执行命令
- `console <命令>` - 控制台执行命令
- `actionbar <消息>` - 显示动作栏消息
- `title <标题> <副标题> <淡入> <停留> <淡出>` - 显示标题

### 条件表达式

```
/arlibs condition <表达式>
```

评估条件表达式。支持以下格式：

- `permission <权限节点>` - 检查权限
- `papi <占位符> [运算符] [值]` - 检查 PlaceholderAPI
- `any [条件1; 条件2; ...]` - 任意条件满足
- `all [条件1; 条件2; ...]` - 所有条件满足
- `not <条件>` - 条件取反

## 🔑 权限节点

- `arlibs.command.reload` - 重载配置权限
- `arlibs.command.debug` - 调试模式权限
- `arlibs.command.action` - 动作表达式权限
- `arlibs.command.condition` - 条件表达式权限

## 💡 小贴士

1. 使用 `/arlibs help` 可以随时查看所有可用命令
2. 调试模式开启后，可以在日志中看到更详细的信息
3. 动作表达式和条件表达式支持复杂的组合使用
4. 所有命令都支持 Tab 补全，方便使用

## 🎨 界面展示

执行 `/arlibs` 命令会显示一个精美的界面：

```
╔═════════════════════════════════╗
║        ArLibs Framework v1.0.0        ║
╠═════════════════════════════════╣
║ Author(s): ArteamTech
║ A powerful library for Bukkit plugins
║
║ Features:
║ • Annotation-based command system
║ • Advanced configuration management
║ • Color processing utilities
║ • Enhanced logging system
║
║ Use /arlibs help for available commands
╚═════════════════════════════════╝
```

## 📝 注意事项

1. 使用动作表达式和条件表达式时，请确保语法正确
2. 重载配置可能会影响正在运行的功能
3. 调试模式会产生更多日志，建议在测试环境使用
4. 所有命令都需要相应的权限才能使用

## 🔄 更新日志

- 版本 1.0.0 (2025-05-25)
  - 初始版本发布
  - 实现基础命令系统
  - 添加配置管理功能
  - 集成动作和条件表达式系统
