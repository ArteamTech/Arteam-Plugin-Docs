# 配置模块 API 指南 ⚙️

> 基于注解的配置系统，让配置管理变得简单而强大

## 📖 简介

ArLibs 的配置模块提供了一个基于注解的配置系统，让开发者能够轻松管理插件配置。它支持：

- 基于注解的配置定义
- 自动配置文件的生成和加载
- 配置值的类型转换和验证
- 嵌套配置结构
- 默认值支持
- 配置注释

## 🎯 快速开始

### 1. 创建配置类

```kotlin
@Config(
    fileName = "config",
    comments = [
        "主配置文件",
        "包含插件的基本设置"
    ]
)
class PluginConfig {
    @ConfigValue(
        path = "debug",
        defaultValue = "false",
        type = "Boolean",
        comments = ["是否启用调试模式"]
    )
    var debug: Boolean = false

    @ConfigField(
        path = "database",
        comments = ["数据库配置部分"]
    )
    var database = DatabaseConfig()
}

class DatabaseConfig {
    @ConfigValue(
        path = "host",
        defaultValue = "localhost",
        comments = ["数据库主机地址"]
    )
    var host: String = "localhost"

    @ConfigValue(
        path = "port",
        defaultValue = "3306",
        type = "Int",
        comments = ["数据库端口"]
    )
    var port: Int = 3306
}
```

### 2. 注册和使用配置

```kotlin
// 注册配置
val config = ConfigManager.register(PluginConfig::class)

// 使用配置
if (config.debug) {
    Logger.debug("调试模式已启用")
}

// 修改配置
config.database.port = 5432
ConfigManager.saveConfig(PluginConfig::class)
```

## 🔧 API 详解

### 配置注解

#### @Config

```kotlin
@Config(
    fileName: String,              // 配置文件名（不含扩展名）
    filePath: String = "",        // 可选的相对路径
    comments: Array<String> = []  // 文件顶部注释
)
```

#### @ConfigField

```kotlin
@ConfigField(
    path: String,                 // 配置路径
    comments: Array<String> = []  // 部分注释
)
```

#### @ConfigValue

```kotlin
@ConfigValue(
    path: String,                 // 配置值路径
    defaultValue: String = "",    // 默认值
    type: String = "",           // 值类型
    validators: Array<String> = [], // 验证器
    comments: Array<String> = [],  // 值注释
    required: Boolean = false     // 是否必需
)
```

## 📝 使用示例

### 1. 基础配置示例

```kotlin
@Config(
    fileName = "settings",
    comments = ["插件基本设置"]
)
class Settings {
    @ConfigValue(
        path = "language",
        defaultValue = "zh_CN",
        comments = ["插件语言"]
    )
    var language: String = "zh_CN"

    @ConfigValue(
        path = "max-players",
        defaultValue = "100",
        type = "Int",
        validators = ["PositiveNumber"],
        comments = ["最大玩家数量"]
    )
    var maxPlayers: Int = 100
}
```

### 2. 嵌套配置示例

```kotlin
@Config(fileName = "advanced")
class AdvancedConfig {
    @ConfigField(
        path = "features",
        comments = ["功能开关配置"]
    )
    var features = FeaturesConfig()

    @ConfigField(
        path = "performance",
        comments = ["性能相关配置"]
    )
    var performance = PerformanceConfig()
}

class FeaturesConfig {
    @ConfigValue(
        path = "enabled",
        defaultValue = "true",
        type = "Boolean",
        comments = ["是否启用高级功能"]
    )
    var enabled: Boolean = true

    @ConfigValue(
        path = "options",
        defaultValue = "option1,option2",
        type = "List<String>",
        comments = ["可用选项列表"]
    )
    var options: List<String> = listOf("option1", "option2")
}

class PerformanceConfig {
    @ConfigValue(
        path = "cache-size",
        defaultValue = "1000",
        type = "Int",
        validators = ["PositiveNumber"],
        comments = ["缓存大小"]
    )
    var cacheSize: Int = 1000
}
```

### 3. 带验证的配置示例

```kotlin
@Config(fileName = "validated")
class ValidatedConfig {
    @ConfigValue(
        path = "port",
        defaultValue = "8080",
        type = "Int",
        validators = ["PortNumber"],
        required = true,
        comments = ["服务器端口号"]
    )
    var port: Int = 8080

    @ConfigValue(
        path = "timeout",
        defaultValue = "30",
        type = "Int",
        validators = ["PositiveNumber", "MaxValue:60"],
        comments = ["超时时间（秒）"]
    )
    var timeout: Int = 30
}
```

## 💡 最佳实践

1. **配置组织**

   - 使用有意义的配置类名和文件名
   - 将相关配置项组织在一起
   - 使用嵌套结构提高可读性
   - 为所有配置项添加清晰的注释

2. **类型安全**

   - 始终指定正确的类型
   - 使用适当的默认值
   - 添加必要的验证器
   - 处理可能的类型转换错误

3. **配置管理**

   - 在插件启动时注册配置
   - 定期保存配置更改
   - 提供配置重载功能
   - 备份重要配置

4. **错误处理**
   - 验证必需字段
   - 处理类型转换异常
   - 提供有意义的错误消息
   - 记录配置加载错误

## 🔍 调试技巧

1. 使用 `ConfigManager.getConfig()` 查看当前配置值
2. 开启调试模式查看详细日志
3. 使用 `ConfigManager.reloadConfig()` 测试配置重载
4. 检查生成的 YAML 文件格式

## 📚 相关 API

- `ConfigManager` - 配置管理器
- `ConfigValidator` - 配置验证器
- `ConfigAPI` - 配置系统核心 API
- `ConfigCommentProcessor` - 配置注释处理器

## ⚠️ 注意事项

1. 配置类必须有无参构造函数
2. 配置字段必须是可变的（var）
3. 列表类型的默认值需要特殊处理
4. 验证器必须正确注册
5. 配置路径不能包含特殊字符
6. 注意配置文件的编码（UTF-8）

## 🔄 更新日志

- 版本 1.0.0 (2025-05-18)
  - 初始版本发布
  - 实现基础配置系统
  - 添加配置验证功能
  - 支持嵌套配置结构
  - 添加配置注释支持
