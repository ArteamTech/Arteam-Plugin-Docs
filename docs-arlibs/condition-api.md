# 条件系统 API 指南 ⚡

> 强大的条件判断系统，支持权限检查、占位符比较和逻辑组合

## 📖 简介

ArLibs 的条件系统提供了一个灵活的条件判断系统，让开发者能够轻松创建和执行各种游戏条件判断。它支持：

- 权限条件检查
- PlaceholderAPI 占位符比较
- 逻辑条件组合（AND/OR/NOT）
- 条件表达式解析
- 条件缓存机制
- 条件验证和调试

## 🎯 快速开始

### 1. 基本条件检查

```kotlin
// 检查单个条件
val result = ConditionManager.evaluate(player, "permission myplugin.use")

// 检查多个条件（全部满足）
val allResult = ConditionManager.evaluateAll(player, listOf(
    "permission myplugin.use",
    "%player_level% >= 10"
))

// 检查多个条件（满足任意一个）
val anyResult = ConditionManager.evaluateAny(player, listOf(
    "permission myplugin.admin",
    "permission myplugin.mod"
))
```

### 2. 权限条件

```kotlin
// 正向权限检查
val hasPermission = ConditionManager.evaluate(player, "permission myplugin.use")

// 反向权限检查
val notHasPermission = ConditionManager.evaluate(player, "!permission myplugin.use")

// 简写形式
val shortForm = ConditionManager.evaluate(player, "myplugin.use")
```

### 3. 占位符条件

```kotlin
// 检查占位符是否存在
val exists = ConditionManager.evaluate(player, "%player_name%")

// 数值比较
val levelCheck = ConditionManager.evaluate(player, "%player_level% >= 10")

// 字符串比较
val nameCheck = ConditionManager.evaluate(player, "%player_name% == Admin")
```

## 🔧 API 详解

### 1. 条件表达式格式

#### 权限条件 🛡️

```kotlin
// 完整格式
"permission myplugin.use"
"perm myplugin.use"

// 简写格式
"myplugin.use"

// 反向检查
"!myplugin.use"
```

#### 占位符条件 📊

```kotlin
// 存在性检查
"%player_name%"

// 数值比较
"%player_level% >= 10"
"%player_balance% < 1000"

// 字符串比较
"%player_name% == Admin"
"%player_faction% != None"
```

#### 逻辑组合 🔄

```kotlin
// AND 组合
"all [permission myplugin.use; %player_level% >= 10]"

// OR 组合
"any [permission myplugin.admin; permission myplugin.mod]"

// NOT 组合
"not permission myplugin.use"

// 复杂组合
"all [permission myplugin.use; any [%player_level% >= 10; %player_vip% == true]]"
```

### 2. 比较操作符 ⚖️

```kotlin
// 大于
">"  // 例如: %player_level% > 10

// 大于等于
">=" // 例如: %player_level% >= 10

// 小于
"<"  // 例如: %player_level% < 10

// 小于等于
"<=" // 例如: %player_level% <= 10

// 等于
"==" // 例如: %player_name% == Admin

// 不等于
"!=" // 例如: %player_faction% != None
```

### 3. 条件管理器 🎮

```kotlin
// 评估单个条件
ConditionManager.evaluate(player, expression)

// 评估多个条件（全部满足）
ConditionManager.evaluateAll(player, expressions)

// 评估多个条件（满足任意一个）
ConditionManager.evaluateAny(player, expressions)

// 验证条件表达式
ConditionManager.isValidExpression(expression)

// 获取条件描述
ConditionManager.getConditionDescription(expression)

// 清除条件缓存
ConditionManager.clearCache()

// 获取缓存大小
ConditionManager.getCacheSize()
```

## ⚠️ 注意事项

### 1. 权限条件 🛡️

```kotlin
// ❌ 错误示例：无效的权限格式
"permission"  // 缺少权限节点
"permission " // 空权限节点

// ✅ 正确示例：有效的权限格式
"permission myplugin.use"
"myplugin.use"
"!myplugin.use"
```

### 2. 占位符条件 📊

```kotlin
// ❌ 错误示例：无效的占位符格式
"%player_name"  // 缺少结束的 %
"%player_name% >"  // 缺少比较值
"%player_name% == " // 空比较值

// ✅ 正确示例：有效的占位符格式
"%player_name%"
"%player_level% >= 10"
"%player_faction% == Admin"
```

### 3. 逻辑组合 🔄

```kotlin
// ❌ 错误示例：无效的逻辑组合
"all []"  // 空条件列表
"any [permission myplugin.use]"  // 单个条件不需要 any
"not "  // 缺少条件

// ✅ 正确示例：有效的逻辑组合
"all [permission myplugin.use; %player_level% >= 10]"
"any [permission myplugin.admin; permission myplugin.mod]"
"not permission myplugin.use"
```

## 🔍 调试技巧

### 1. 条件测试 🧪

```kotlin
fun testConditions() {
    val testCases = listOf(
        "permission myplugin.use",
        "%player_level% >= 10",
        "all [permission myplugin.use; %player_level% >= 10]",
        "any [permission myplugin.admin; permission myplugin.mod]"
    )

    testCases.forEach { expression ->
        try {
            val isValid = ConditionManager.isValidExpression(expression)
            val description = ConditionManager.getConditionDescription(expression)
            println("表达式: $expression")
            println("是否有效: $isValid")
            println("描述: $description")
        } catch (e: Exception) {
            println("测试失败: $expression")
            println("错误信息: ${e.message}")
        }
    }
}
```

### 2. 性能测试 ⚡

```kotlin
fun testPerformance() {
    val startTime = System.currentTimeMillis()

    // 测试条件缓存
    repeat(1000) { i ->
        val expression = "permission myplugin.use$i"
        ConditionManager.evaluate(player, expression)
    }

    val endTime = System.currentTimeMillis()
    println("条件评估耗时: ${endTime - startTime}ms")
    println("缓存大小: ${ConditionManager.getCacheSize()}")
}
```

### 3. 条件解析测试 🔍

```kotlin
fun testConditionParsing() {
    val complexExpression = """
        all [
            permission myplugin.use;
            any [
                %player_level% >= 10;
                %player_vip% == true
            ];
            not permission myplugin.blocked
        ]
    """.trimIndent()

    try {
        val isValid = ConditionManager.isValidExpression(complexExpression)
        val description = ConditionManager.getConditionDescription(complexExpression)
        println("复杂表达式解析测试:")
        println("表达式: $complexExpression")
        println("是否有效: $isValid")
        println("描述: $description")
    } catch (e: Exception) {
        println("解析失败: ${e.message}")
    }
}
```

## 📚 相关 API

- `ConditionManager` - 条件管理器 🎮
- `ConditionParser` - 条件解析器 🔍
- `ComparisonOperator` - 比较操作符 ⚖️
- `PermissionCondition` - 权限条件 🛡️
- `PlaceholderCondition` - 占位符条件 📊
- `AllCondition` - 逻辑与条件 🔄
- `AnyCondition` - 逻辑或条件 🔄
- `NotCondition` - 逻辑非条件 🔄

## ⚠️ 注意事项

1. 条件表达式区分大小写
2. 占位符条件需要 PlaceholderAPI 支持
3. 条件缓存会占用内存，必要时调用 clearCache()
4. 复杂的逻辑组合可能影响性能
5. 建议使用条件描述进行调试

## 🔄 更新日志

- 版本 1.0.0 (2025-06-01)
  - 初始版本发布
  - 支持权限条件检查
  - 支持占位符条件比较
  - 支持逻辑条件组合
  - 添加条件缓存机制
  - 实现条件表达式解析
