---
sidebar_position: 6
---

# 数据库模块

:::note 开发中
数据库模块目前正在开发中，此文档是对计划功能的预览。
:::

ArLibs 的数据库模块将简化数据库操作，支持多种数据存储方式，让插件开发者能够轻松实现数据持久化功能，而无需深入了解数据库细节。

## 计划特性

- **多种数据库支持** - SQLite、MySQL/MariaDB、PostgreSQL
- **连接池管理** - 自动管理数据库连接池，优化性能
- **异步操作** - 防止数据库操作阻塞主线程
- **ORM 支持** - 对象关系映射，简化数据与对象的转换
- **迁移系统** - 数据库结构版本控制和自动升级
- **查询构建器** - 流式 API 构建 SQL 查询，无需手写 SQL
- **事务支持** - 支持数据库事务，确保数据一致性
- **数据缓存** - 智能缓存机制，减少数据库访问

## 预期用法

以下是数据库模块计划支持的用法示例：

### 基本设置

```kotlin
// 在插件的 onEnable() 方法中初始化数据库
val database = DatabaseManager.init(plugin)
    .type(DatabaseType.SQLITE)                // 设置数据库类型
    .file("playerdata.db")                    // SQLite 文件名
    .connect()                                // 建立连接

// 或者连接到 MySQL
val mysqlDb = DatabaseManager.init(plugin)
    .type(DatabaseType.MYSQL)
    .credentials(
        host = "localhost",
        port = 3306,
        database = "minecraft",
        username = "user",
        password = "pass"
    )
    .poolSize(5)                              // 连接池大小
    .connect()
```

### 表定义和创建

```kotlin
// 定义表结构
database.createTable("players")
    .column("id", ColumnType.INT, primaryKey = true, autoIncrement = true)
    .column("uuid", ColumnType.VARCHAR, length = 36, notNull = true, unique = true)
    .column("name", ColumnType.VARCHAR, length = 16, notNull = true)
    .column("balance", ColumnType.DOUBLE, defaultValue = 0.0)
    .column("last_login", ColumnType.TIMESTAMP)
    .column("data", ColumnType.JSON)
    .create()

// 或者使用注解的方式定义表
@Table("players")
data class PlayerData(
    @Column(primaryKey = true, autoIncrement = true)
    val id: Int = 0,
    
    @Column(unique = true, notNull = true)
    val uuid: String,
    
    @Column(notNull = true)
    val name: String,
    
    @Column(defaultValue = "0.0")
    val balance: Double = 0.0,
    
    @Column
    val lastLogin: Timestamp? = null,
    
    @Column(type = ColumnType.JSON)
    val data: Map<String, Any> = mapOf()
)

// 创建表
database.createTable(PlayerData::class)
```

### 基本查询操作

```kotlin
// 插入数据
database.insert("players")
    .value("uuid", player.uniqueId.toString())
    .value("name", player.name)
    .value("last_login", Timestamp.from(Instant.now()))
    .execute()

// 或者插入对象
val playerData = PlayerData(
    uuid = player.uniqueId.toString(),
    name = player.name,
    lastLogin = Timestamp.from(Instant.now())
)
database.insert(playerData)

// 查询数据
val result = database.select("players")
    .column("*")
    .where("uuid", player.uniqueId.toString())
    .first()

// 或者查询为对象
val playerData = database.select(PlayerData::class)
    .where("uuid", player.uniqueId.toString())
    .firstOrNull()

// 更新数据
database.update("players")
    .set("balance", 100.0)
    .set("last_login", Timestamp.from(Instant.now()))
    .where("uuid", player.uniqueId.toString())
    .execute()

// 或者更新对象
playerData.balance = 100.0
playerData.lastLogin = Timestamp.from(Instant.now())
database.update(playerData)

// 删除数据
database.delete("players")
    .where("uuid", player.uniqueId.toString())
    .execute()

// 或者删除对象
database.delete(playerData)
```

### 异步操作

```kotlin
// 异步查询
database.async().select("players")
    .column("*")
    .where("uuid", player.uniqueId.toString())
    .first { result ->
        // 在异步线程中处理结果
        val balance = result.getDouble("balance")
        
        // 切换回主线程处理 UI 更新
        plugin.server.scheduler.runTask(plugin, Runnable {
            player.sendMessage("你的余额: $balance")
        })
    }
```

### 高级查询

```kotlin
// 复杂条件查询
val highBalancePlayers = database.select("players")
    .column("name", "balance")
    .where("balance", ">", 1000.0)
    .and("last_login", ">", Timestamp.from(Instant.now().minus(30, ChronoUnit.DAYS)))
    .orderBy("balance", OrderDirection.DESC)
    .limit(10)
    .getList()

// JOIN 查询
val playerItems = database.select("players", "p")
    .column("p.name", "i.item_name", "i.quantity")
    .join("player_items", "i", "p.id = i.player_id")
    .where("p.uuid", player.uniqueId.toString())
    .getList()
```

## 计划时间线

数据库模块预计将在 ArLibs 的未来版本中实现，基本功能包括：

1. SQLite 数据库的基本操作支持
2. 简单的查询构建器
3. 异步查询支持
4. 基本的 ORM 功能

高级功能如 MySQL 支持、迁移系统、事务支持和数据缓存将在后续版本中逐步添加。