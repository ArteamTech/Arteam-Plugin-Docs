---
sidebar_position: 3
---

# 颜色工具 API 指南 🎨

> 强大的颜色处理工具，支持多种颜色格式和特效

## 📖 简介

ArLibs 的颜色工具提供了丰富的颜色处理功能，支持：

- 常规 Minecraft 颜色代码
- 十六进制颜色
- 渐变色效果
- 彩虹效果
- 颜色代码清理

## 🎯 快速开始

### 1. 基础颜色代码

```kotlin
// 使用 & 符号的颜色代码
val text = "&a绿色文本 &b浅蓝色文本"
val processed = ColorUtil.process(text)

// 使用 § 符号的颜色代码
val text2 = "§a绿色文本 §b浅蓝色文本"
val processed2 = ColorUtil.process(text2)
```

### 2. 十六进制颜色

```kotlin
// 使用十六进制颜色代码
val text = "这是<#FF0000>红色</#FF0000>文本"
val processed = ColorUtil.process(text)

// 短格式十六进制颜色
val text2 = "这是<#F00>红色</#F00>文本"  // 自动扩展为 #FF0000
val processed2 = ColorUtil.process(text2)
```

### 3. 渐变效果

```kotlin
// 基本渐变
val text = "<gradient:#FF0000:#00FF00>红到绿渐变</gradient>"
val processed = ColorUtil.process(text)

// 带速度的渐变
val text2 = "<gradient#2:#FF0000:#00FF00:#0000FF>三色渐变</gradient>"
val processed2 = ColorUtil.process(text2)

// 循环渐变
val text3 = "<gradient:#FF0000:#00FF00:loop>循环渐变</gradient>"
val processed3 = ColorUtil.process(text3)
```

### 4. 彩虹效果

```kotlin
// 基本彩虹
val text = "<rainbow>彩虹文本</rainbow>"
val processed = ColorUtil.process(text)

// 自定义彩虹
val text2 = "<rainbow#2:0.8:1.0>自定义彩虹</rainbow>"
val processed2 = ColorUtil.process(text2)

// 循环彩虹
val text3 = "<rainbow:loop>循环彩虹</rainbow>"
val processed3 = ColorUtil.process(text3)
```

## 🔧 API 详解

### 1. 颜色代码转换

```kotlin
// 将 & 转换为 §
val text = "&a绿色文本"
val converted = ColorUtil.translateColorCodes(text)
// 结果: "§a绿色文本"
```

### 2. 颜色处理

```kotlin
// 处理所有支持的颜色格式
val text = "&a绿色 <#FF0000>红色</#FF0000> <gradient:#FF0000:#00FF00>渐变</gradient>"
val processed = ColorUtil.process(text)
```

### 3. 颜色代码清理

```kotlin
// 移除所有颜色代码
val text = "&a绿色 <#FF0000>红色</#FF0000>"
val stripped = ColorUtil.stripColorCodes(text)
// 结果: "绿色 红色"
```

## ⚠️ 注意事项

### 1. 十六进制颜色

```kotlin
// ❌ 错误示例：无效的十六进制颜色
val wrongHex = "<#GG0000>文本</#GG0000>"  // 包含非十六进制字符

// ✅ 正确示例：有效的十六进制颜色
val correctHex = "<#FF0000>文本</#FF0000>"
```

### 2. 渐变效果

```kotlin
// ❌ 错误示例：颜色数量不足
val wrongGradient = "<gradient:#FF0000>单色渐变</gradient>"  // 至少需要两个颜色

// ✅ 正确示例：正确的渐变格式
val correctGradient = "<gradient:#FF0000:#00FF00>双色渐变</gradient>"
```

### 3. 彩虹效果

```kotlin
// ❌ 错误示例：无效的饱和度或亮度
val wrongRainbow = "<rainbow:2.0:2.0>彩虹文本</rainbow>"  // 值超出范围

// ✅ 正确示例：正确的彩虹格式
val correctRainbow = "<rainbow:0.8:1.0>彩虹文本</rainbow>"
```

## 🔍 调试技巧

### 1. 颜色代码测试

```kotlin
fun testColorCodes() {
    val testCases = listOf(
        "&a绿色文本",
        "<#FF0000>红色文本</#FF0000>",
        "<gradient:#FF0000:#00FF00>渐变文本</gradient>",
        "<rainbow>彩虹文本</rainbow>"
    )

    testCases.forEach { text ->
        try {
            val processed = ColorUtil.process(text)
            println("原始文本: $text")
            println("处理结果: $processed")
            println("清理后: ${ColorUtil.stripColorCodes(processed)}")
        } catch (e: Exception) {
            println("处理失败: $text")
            println("错误信息: ${e.message}")
        }
    }
}
```

### 2. 性能测试

```kotlin
fun testPerformance() {
    val longText = "这是一个很长的文本，包含各种颜色代码："
        .repeat(100)
        .let { base ->
            buildString {
                append(base)
                append("&a绿色部分 ")
                append("<#FF0000>红色部分</#FF0000> ")
                append("<gradient:#FF0000:#00FF00>渐变部分</gradient> ")
                append("<rainbow>彩虹部分</rainbow>")
            }
        }

    val startTime = System.currentTimeMillis()
    val processed = ColorUtil.process(longText)
    val endTime = System.currentTimeMillis()

    println("处理时间: ${endTime - startTime}ms")
    println("文本长度: ${longText.length}")
    println("处理结果长度: ${processed.length}")
}
```

## 📚 相关 API

- `ColorUtil.process()` - 处理所有颜色格式
- `ColorUtil.translateColorCodes()` - 转换颜色代码
- `ColorUtil.stripColorCodes()` - 清理颜色代码

## ⚠️ 注意事项

1. 十六进制颜色必须使用有效的十六进制值
2. 渐变效果至少需要两个颜色
3. 彩虹效果的饱和度和亮度必须在 0.0-1.0 范围内
4. 颜色代码处理是大小写不敏感的
5. 短格式十六进制颜色会自动扩展为完整格式

## 🔄 更新日志

- 版本 1.0.0 (2025-05-18)
  - 初始版本发布
  - 支持常规颜色代码
  - 支持十六进制颜色
  - 支持渐变效果
  - 支持彩虹效果
  - 添加颜色代码清理功能
