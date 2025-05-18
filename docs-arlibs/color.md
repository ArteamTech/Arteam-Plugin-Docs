---
sidebar_position: 3
---

# 颜色工具

ArLibs 提供了强大的文本颜色处理工具 ColorUtil，支持多种颜色格式，包括 Minecraft 传统颜色代码、十六进制颜色、渐变色和彩虹效果。

## 主要特性

- **传统颜色代码** - 支持标准的 Minecraft 颜色代码转换 (`&` → `§`)
- **十六进制颜色** - 支持 RGB 十六进制颜色格式，如 `<#FF5733>`
- **渐变效果** - 支持多点渐变色文本，如 `<gradient:#FF5733:#3399FF>文本</gradient>`
- **彩虹效果** - 创建鲜艳的彩虹色文本，如 `<rainbow>文本</rainbow>`
- **颜色移除** - 从文本中移除所有颜色代码

## 基本用法

### 传统颜色代码

将 `&` 颜色代码转换为 Minecraft 使用的 `§` 颜色代码：

```kotlin
// 将 & 颜色代码转换为 § 颜色代码
val coloredText = ColorUtil.translateColorCodes("&aHello &bworld!")
// 结果: "§aHello §bworld!"
```

### 处理所有颜色格式

一次性处理文本中的所有颜色格式，包括传统颜色代码、十六进制颜色、渐变和彩虹效果：

```kotlin
// 处理所有支持的颜色格式
val text = "&a常规颜色 <#FF5733>十六进制颜色 <gradient:#FF5733:#3399FF>渐变色</gradient> <rainbow>彩虹色</rainbow>"
val processedText = ColorUtil.process(text)
```

### 移除颜色代码

从文本中移除所有颜色代码，得到纯文本内容：

```kotlin
// 移除所有颜色代码
val plainText = ColorUtil.stripColorCodes(coloredText)
```

## 高级颜色格式

### 十六进制颜色

使用 RGB 十六进制格式指定精确的颜色：

```kotlin
// 格式: <#RRGGBB> 其中 RR, GG, BB 是十六进制值
val text = "这是<#FF5733>橙色</gradient>文本"
val processed = ColorUtil.process(text)
```

### 渐变色

在文本上应用平滑的颜色渐变效果：

```kotlin
// 基本渐变 (两种颜色之间)
val basic = "<gradient:#FF5733:#3399FF>这是从橙色到蓝色的渐变</gradient>"

// 多点渐变 (三种或更多颜色)
val multi = "<gradient:#FF5733:#33FF57:#3399FF>这是三色渐变</gradient>"

// 控制渐变速度
val speed = "<gradient#2:#FF5733:#3399FF>这是速度为2的渐变</gradient>"

// 循环渐变
val loop = "<gradient:#FF5733:#3399FF:loop>这是循环渐变效果</gradient>"

// 处理所有格式
val processed = ColorUtil.process(basic + "\n" + multi + "\n" + speed + "\n" + loop)
```

### 彩虹效果

创建炫彩的彩虹色文本：

```kotlin
// 基本彩虹效果
val basic = "<rainbow>这是彩虹色文本</rainbow>"

// 控制彩虹速度
val speed = "<rainbow#2>这是速度为2的彩虹效果</rainbow>"

// 调整饱和度和亮度
val custom = "<rainbow:0.8:0.9>这是自定义饱和度和亮度的彩虹</rainbow>"

// 循环彩虹效果
val loop = "<rainbow:loop>这是循环彩虹效果</rainbow>"

// 处理所有格式
val processed = ColorUtil.process(basic + "\n" + speed + "\n" + custom + "\n" + loop)
```

## 实现细节

ColorUtil 使用正则表达式来识别和处理不同类型的颜色格式。以下是一些关键实现细节：

- 使用 `Pattern.compile()` 预编译正则表达式以提高性能
- 支持嵌套颜色格式，内部格式会先处理
- 支持短十六进制格式 (`#RGB`) 的自动扩展为完整格式 (`#RRGGBB`)
- 使用 HSB 颜色空间进行彩虹效果的生成
- 支持颜色插值算法用于渐变效果 