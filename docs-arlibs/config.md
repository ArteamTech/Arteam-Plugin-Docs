---
sidebar_position: 4
---

# 配置模块

:::note 开发中
配置模块目前正在开发中，此文档是对计划功能的预览。
:::

ArLibs 的配置模块将提供简单易用的配置文件操作，支持多种格式，并具有丰富的功能。

## 计划特性

- **多格式支持** - 支持 YAML、JSON、HOCON 等多种配置格式
- **自动加载与保存** - 简化配置文件的读写操作
- **类型安全** - 强类型配置访问，减少运行时错误
- **默认值处理** - 优雅处理缺失配置项的默认值
- **注释保留** - 保留配置文件中的注释和格式
- **版本迁移** - 配置文件版本控制和自动升级功能
- **配置验证** - 验证配置值的有效性
- **路径访问** - 支持点分隔符路径访问嵌套配置

## 预期用法

以下是配置模块计划支持的用法示例：

### 基本配置操作

```kotlin
// 创建/加载配置
val config = Config.load(plugin, "config.yml")

// 读取配置值 (带默认值)
val serverName = config.getString("server.name", "默认服务器")
val maxPlayers = config.getInt("server.max-players", 20)
val enableFeature = config.getBoolean("features.newFeature", false)

// 设置配置值
config.set("server.name", "我的服务器")
config.set("server.motd", "欢迎来到我的服务器!")

// 保存配置
config.save()
```

### 类型安全的配置

```kotlin
// 使用注解的数据类自动映射配置
@ConfigObject("server")
data class ServerConfig(
    val name: String = "默认服务器",
    val maxPlayers: Int = 20,
    val motd: String = "欢迎!",
    @ConfigPath("nested.value") val nestedValue: Double = 1.0
)

// 加载映射到数据类
val serverConfig = config.get(ServerConfig::class)

// 使用强类型配置
println("服务器名: ${serverConfig.name}")
println("最大玩家数: ${serverConfig.maxPlayers}")

// 保存回配置
config.set(serverConfig)
```

### 配置迁移

```kotlin
// 定义配置版本
val config = Config.load(plugin, "config.yml")
    .version(1) // 当前配置版本
    .migration(0, 1) { oldConfig, newConfig ->
        // 从版本 0 迁移到版本 1 的逻辑
        newConfig.set("server.name", oldConfig.getString("serverName", "默认服务器"))
        newConfig.set("server.max-players", oldConfig.getInt("maxPlayers", 20))
    }
    .load() // 执行加载，如果需要，将自动进行迁移
```

## 计划时间线

配置模块预计将在 ArLibs 的下一个版本中实现基础功能，包括：

1. YAML 配置文件的基本操作
2. 简单类型的读写 (字符串、数字、布尔值、列表)
3. 默认值支持
4. 自动保存和加载

高级功能如类型安全配置、版本迁移、配置验证等将在后续版本中逐步添加。 