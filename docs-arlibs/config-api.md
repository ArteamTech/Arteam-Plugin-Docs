# 配置模块 API 指南 ⚙️

> 基于注解的配置系统，让配置管理变得简单而强大

## 📖 简介

ArLibs 的配置模块提供了一个基于注解的配置系统，让开发者能够轻松管理插件配置。它支持：

- 基于注解的配置定义 📝
- 自动配置文件的生成和加载 🔄
- 配置值的类型转换和验证 ✅
- 嵌套配置结构 📚
- 默认值支持 ⚡
- 配置注释 💭

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

### 1. 配置类定义

```kotlin
// ❌ 错误示例：缺少无参构造函数
@Config(fileName = "error")
class ErrorConfig(val someValue: String) {
    @ConfigValue(path = "value")
    var value: String = ""
}

// ✅ 正确示例：提供无参构造函数
@Config(fileName = "correct")
class CorrectConfig {
    constructor() // 显式声明无参构造函数

    @ConfigValue(path = "value")
    var value: String = ""
}
```

### 2. 字段可见性

```kotlin
@Config(fileName = "visibility")
class VisibilityConfig {
    // ❌ 错误示例：私有字段
    @ConfigValue(path = "private")
    private var privateValue: String = ""

    // ✅ 正确示例：公开字段
    @ConfigValue(path = "public")
    var publicValue: String = ""

    // ✅ 正确示例：使用 getter/setter
    @ConfigValue(path = "with-accessors")
    private var _value: String = ""
    var value: String
        get() = _value
        set(value) { _value = value }
}
```

### 3. 类型转换

```kotlin
@Config(fileName = "type-conversion")
class TypeConversionConfig {
    // ❌ 错误示例：不明确的类型
    @ConfigValue(
        path = "ambiguous",
        defaultValue = "1,2,3" // 不明确是字符串还是数字列表
    )
    var ambiguous: List<Any> = listOf()

    // ✅ 正确示例：明确的类型
    @ConfigValue(
        path = "numbers",
        defaultValue = "1,2,3",
        type = "List<Int>"
    )
    var numbers: List<Int> = listOf()

    // ✅ 正确示例：复杂对象列表
    @ConfigField(path = "items")
    var items: List<ItemConfig> = listOf()
}

class ItemConfig {
    @ConfigValue(path = "name")
    var name: String = ""

    @ConfigValue(path = "quantity")
    var quantity: Int = 0
}
```

### 4. 验证器使用

```kotlin
@Config(fileName = "validation")
class ValidationConfig {
    // ❌ 错误示例：未注册的验证器
    @ConfigValue(
        path = "invalid",
        validators = ["NonExistentValidator"]
    )
    var invalid: Int = 0

    // ✅ 正确示例：使用内置验证器
    @ConfigValue(
        path = "port",
        defaultValue = "8080",
        type = "Int",
        validators = ["PortNumber"]
    )
    var port: Int = 8080

    // ✅ 正确示例：多个验证器
    @ConfigValue(
        path = "age",
        defaultValue = "18",
        type = "Int",
        validators = ["PositiveNumber", "MaxValue:100"]
    )
    var age: Int = 18
}
```

### 5. 嵌套配置

```kotlin
@Config(fileName = "nested")
class NestedConfig {
    // ❌ 错误示例：直接嵌套
    @ConfigValue(path = "nested.value")
    var nestedValue: String = ""

    // ✅ 正确示例：使用 ConfigField
    @ConfigField(path = "nested")
    var nested = NestedSection()
}

class NestedSection {
    @ConfigValue(path = "value")
    var value: String = ""
}
```

### 6. 配置重载

```kotlin
@Config(fileName = "reload")
class ReloadConfig {
    @ConfigValue(path = "value")
    var value: String = ""

    // ✅ 正确示例：处理重载
    fun onReload() {
        try {
            ConfigManager.reloadConfig(ReloadConfig::class)
            val config = ConfigManager.getConfig(ReloadConfig::class)
            // 处理重载后的配置
        } catch (e: Exception) {
            Logger.severe("配置重载失败: ${e.message}")
        }
    }
}
```

### 7. 默认值处理

```kotlin
@Config(fileName = "defaults")
class DefaultsConfig {
    // ❌ 错误示例：不匹配的默认值
    @ConfigValue(
        path = "number",
        defaultValue = "not-a-number",
        type = "Int"
    )
    var number: Int = 0

    // ✅ 正确示例：匹配的默认值
    @ConfigValue(
        path = "number",
        defaultValue = "42",
        type = "Int"
    )
    var number: Int = 42

    // ✅ 正确示例：列表默认值
    @ConfigValue(
        path = "list",
        defaultValue = "item1,item2,item3",
        type = "List<String>"
    )
    var list: List<String> = listOf("item1", "item2", "item3")
}
```

### 8. 错误处理

```kotlin
@Config(fileName = "error-handling")
class ErrorHandlingConfig {
    @ConfigValue(
        path = "required",
        required = true
    )
    var required: String = ""

    // ✅ 正确示例：错误处理
    fun loadConfig() {
        try {
            val config = ConfigManager.getConfig(ErrorHandlingConfig::class)
            if (config.required.isEmpty()) {
                throw IllegalStateException("必需字段 'required' 未设置")
            }
        } catch (e: Exception) {
            Logger.severe("配置加载失败: ${e.message}")
            // 使用默认值或采取其他措施
        }
    }
}
```

## 🔍 调试技巧

### 1. 配置检查

```kotlin
fun checkConfig() {
    val config = ConfigManager.getConfig(YourConfig::class)

    // 打印所有配置值
    config.javaClass.declaredFields.forEach { field ->
        field.isAccessible = true
        println("${field.name}: ${field.get(config)}")
    }

    // 检查必需字段
    config.javaClass.declaredFields
        .filter { it.isAnnotationPresent(ConfigValue::class.java) }
        .filter { it.getAnnotation(ConfigValue::class.java).required }
        .forEach { field ->
            field.isAccessible = true
            if (field.get(config) == null) {
                println("警告: 必需字段 ${field.name} 为空")
            }
        }
}
```

### 2. 验证器测试

```kotlin
fun testValidators() {
    val validators = ConfigValidator.getValidators()

    // 测试每个验证器
    validators.forEach { (name, validator) ->
        println("测试验证器: $name")
        // 测试有效值
        val validValue = "test"
        val validResult = validator.validate(validValue)
        println("有效值测试: $validResult")

        // 测试无效值
        val invalidValue = ""
        val invalidResult = validator.validate(invalidValue)
        println("无效值测试: $invalidResult")
    }
}
```

### 3. 配置重载测试

```kotlin
fun testReload() {
    // 保存当前配置
    val originalConfig = ConfigManager.getConfig(YourConfig::class)

    // 修改配置文件
    val configFile = File(ArLibs.getInstance().dataFolder, "your-config.yml")
    configFile.writeText("""
        value: "new value"
        nested:
          value: "new nested value"
    """.trimIndent())

    // 重载配置
    ConfigManager.reloadConfig(YourConfig::class)

    // 检查更改
    val newConfig = ConfigManager.getConfig(YourConfig::class)
    println("配置已更改: ${originalConfig != newConfig}")
}
```

## 🔄 更新日志

- 版本 1.0.0 (2025-05-18)
  - 初始版本发布
  - 实现基础配置系统
  - 添加配置验证功能
  - 支持嵌套配置结构
  - 添加配置注释支持
