---
sidebar_position: 1
---

# ArLibs

ArLibs 是一个为 Minecraft 插件开发者设计的基础工具库，提供了丰富的工具类和 API，简化常见的开发任务，让你可以专注于插件的核心功能开发。

## 当前功能

目前 ArLibs 处于开发初期阶段，已经实现了以下功能：

- **日志系统** - 增强的日志工具，支持彩色输出和异步日志记录
- **颜色工具** - 强大的文本颜色处理工具，支持 Minecraft 颜色代码、十六进制颜色、渐变色和彩虹效果

### 日志系统

ArLibs 提供了一个增强的日志系统，支持彩色输出和异步日志记录：

```kotlin
// 初始化日志系统
Logger.init(plugin, debug = false)

// 记录不同级别的日志
Logger.info("这是一条信息")
Logger.warn("这是一条警告")
Logger.severe("这是一条严重错误")
Logger.debug("这条只在调试模式启用时显示")

// 支持颜色代码
Logger.info("&a这是绿色文本 &c这是红色文本")

// 支持十六进制颜色
Logger.info("<#FF5733>这是自定义颜色文本")

// 支持渐变色
Logger.info("<gradient:#FF5733:#3399FF>这是渐变文本</gradient>")

// 支持彩虹效果
Logger.info("<rainbow>这是彩虹文本</rainbow>")
```

### 颜色工具

ColorUtil 提供了丰富的文本颜色处理功能：

```kotlin
// 将 & 颜色代码转换为 § 颜色代码
val coloredText = ColorUtil.translateColorCodes("&aHello &bworld!")

// 处理所有支持的颜色格式
val processedText = ColorUtil.process("&aHello <#FF5733>custom color</gradient:#FF5733:#3399FF>gradient</gradient> <rainbow>rainbow</rainbow>")

// 移除所有颜色代码
val plainText = ColorUtil.stripColorCodes(coloredText)
```

## 计划中的功能

ArLibs 计划开发四大核心模块，为插件开发提供全面支持：

### 1. 配置模块

提供简单易用的配置文件操作，支持 YAML、JSON 等格式：

- 自动加载和保存配置文件
- 配置数据的序列化和反序列化
- 配置版本控制和自动升级
- 配置注释保留和格式化

### 2. 语言模块

多语言支持系统，轻松实现插件国际化：

- 自动检测和加载语言文件
- 支持变量替换和格式化
- 支持基于玩家语言偏好的消息发送
- 内置常用语言支持

### 3. 数据库模块

简化数据库操作，支持多种数据存储方式：

- SQLite、MySQL 数据库连接管理
- 对象关系映射 (ORM) 支持
- 数据迁移和版本控制
- 高性能异步数据操作

### 4. 命令模块

简化命令注册和处理流程：

- 注解驱动的命令注册
- 自动 Tab 补全支持
- 参数类型转换和验证
- 基于权限的命令访问控制

## 如何使用

由于 ArLibs 目前处于开发初期阶段，我们正在完善文档和示例代码。请关注我们的 [GitHub 仓库](https://github.com/ArTeamTech/ArLibs) 获取最新更新和使用指南。

## 贡献指南

我们欢迎社区贡献！如果你想为 ArLibs 做出贡献，请查看我们的 [贡献指南](https://github.com/ArTeamTech/ArLibs/blob/main/CONTRIBUTING.md)。

## 许可证

ArLibs 使用 [MIT 许可证](https://github.com/ArTeamTech/ArLibs/blob/main/LICENSE)。
