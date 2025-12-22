# 快速开始 {#start}

本指南将帮助你快速搭建一个 mioki 机器人项目。

## 前置条件 {#prerequisites}

在开始之前，请确保你的环境满足以下条件：

- **Node.js**：版本 >= 22.18.0（可以直接运行 TS，推荐使用 LTS 版本）
- **NapCat**：已部署并运行的 [NapCat](https://napneko.github.io/) 实例

## 安装 NapCat {#install-napcat}

mioki 依赖 NapCat 作为 QQ 协议端，请先参考 [NapCat 官方文档](https://napneko.github.io/) 完成 NapCat 的安装和配置。

配置 NapCat 时，请确保：

1. 创建一个 **正向 WebSocket** 服务器
2. 记录 WebSocket 服务的 **端口号** 和 **访问令牌（token）**

## 创建项目 {#create-project}

### 方式一：使用 CLI 创建（推荐）{#create-with-cli}

mioki 提供了交互式命令行工具，只需一条命令即可完成项目初始化。

::: tip 💡 快速跳过交互
如果你已经知道 NapCat 的配置信息，可以通过参数一键创建：
```sh
npx mioki@latest --name mioki-bot --port 3001 --token <你的Token> --owners <你的QQ>
```
更多参数请参考 [CLI 参数说明](/mioki/api#cli)。
:::

::: code-group

```sh [npm]
$ npx mioki@latest
```

```sh [pnpm]
$ pnpx mioki@latest
```

```sh [yarn]
$ yarn dlx mioki@latest
```

:::

CLI 会依次引导你完成项目名称、NapCat 连接配置、权限设置等，创建完成后按提示启动即可：

```sh
cd mioki-bot && npm install && npm start
```

### 方式二：手动创建 {#create-manually}

如果你更喜欢手动配置，也可以按照以下步骤创建项目：

#### 初始化项目目录

```sh
# 创建项目目录
mkdir mioki-bot && cd mioki-bot

# 初始化 package.json
npm init
```

#### 安装 mioki

```sh
npm add mioki
```

#### 创建入口文件

创建 `app.ts` 作为机器人入口：

```ts
// app.ts
require('mioki').start({ cwd: __dirname })
```

#### 配置 mioki

在 `package.json` 中添加 `mioki` 配置项：

```json
{
  "name": "mioki-bot",
  "scripts": {
    "start": "node app.ts"
  },
  "dependencies": {
    "mioki": "latest"
  },
  "mioki": {
    "prefix": "#",
    "owners": [123456789],
    "admins": [],
    "plugins": [],
    "log_level": "info",
    "error_push": true,
    "online_push": true,
    "napcat": {
      "protocol": "ws",
      "host": "localhost",
      "port": 3001,
      "token": "your-napcat-token"
    }
  }
}
```

### 配置项说明

| 配置项            | 类型       | 默认值      | 说明                                       |
| ----------------- | ---------- | ----------- | ------------------------------------------ |
| `prefix`          | `string`   | `#`         | 指令前缀，用于识别框架指令                 |
| `owners`          | `number[]` | `[]`        | 机器人主人 QQ 号列表，拥有最高权限         |
| `admins`          | `number[]` | `[]`        | 机器人管理员 QQ 号列表                     |
| `plugins`         | `string[]` | `[]`        | 启用的插件列表（插件目录名）               |
| `log_level`       | `string`   | `info`      | 日志级别：`debug`、`info`、`warn`、`error` |
| `plugins_dir`     | `string`   | `plugins`   | 插件目录路径                               |
| `error_push`      | `boolean`  | `false`     | 是否将未捕获的错误推送给主人               |
| `online_push`     | `boolean`  | `false`     | 机器人上线时是否通知主人                   |
| `napcat.token`    | `string`   | -           | NapCat WebSocket 访问密钥                  |
| `napcat.protocol` | `string`   | `ws`        | WebSocket 协议：`ws` 或 `wss`，默认 ws     |
| `napcat.host`     | `string`   | `localhost` | NapCat WebSocket 服务地址，默认 localhost  |
| `napcat.port`     | `number`   | `3001`      | NapCat WebSocket 服务端口，默认 3001       |

## 启动机器人 {#run}

确保 NapCat 实例已启动并登录成功后，运行以下命令启动 mioki：

```sh
pnpm start
```

如果一切正常，你将看到类似以下的输出：

```
========================================
欢迎使用 mioki 💓 v1.0.0
一个基于 NapCat 的插件式 QQ 机器人框架
轻量 * 跨平台 * 插件式 * 热重载 * 注重开发体验
========================================
>>> 正在连接 NapCat 实例: ws://localhost:3001?access_token=***
已连接到 NapCat 实例: NapCat-v4.2.0 机器人昵称(123456789)
>>> 加载 mioki 内置插件: mioki-core
成功加载了 1 个插件，总耗时 10.00 毫秒
mioki v1.0.0 启动完成，祝您使用愉快 🎉️
```

## 内置指令 {#commands}

mioki 内置了一些管理指令（仅主人可用），默认使用 `#` 作为指令前缀：

| 指令                   | 说明             |
| ---------------------- | ---------------- |
| `#帮助`                | 显示帮助信息     |
| `#状态`                | 显示框架运行状态 |
| `#插件 列表`           | 查看所有插件     |
| `#插件 启用 <插件名>`  | 启用指定插件     |
| `#插件 禁用 <插件名>`  | 禁用指定插件     |
| `#插件 重载 <插件名>`  | 重载指定插件     |
| `#设置 详情`           | 查看当前配置     |
| `#设置 加主人 <QQ/AT>` | 添加主人         |
| `#设置 删主人 <QQ/AT>` | 删除主人         |
| `#设置 加管理 <QQ/AT>` | 添加管理员       |
| `#设置 删管理 <QQ/AT>` | 删除管理员       |
| `#退出`                | 退出机器人进程   |

## 目录结构 {#structure}

一个典型的 mioki 项目目录结构如下：

```
bot/
├── app.ts              # 入口文件
├── package.json        # 项目配置（包含 mioki 配置）
├── plugins/            # 插件目录
│   ├── hello/          # 插件示例
│   │   └── index.ts
│   └── ...
└── logs/               # 日志目录（自动生成）
```

## 下一步 {#next-steps}

- 阅读 [插件开发指南](/plugin) 学习如何编写插件
- 查看 [mioki API 文档](/mioki/api) 了解更多 API
- 探索 [NapCat SDK 文档](/napcat-sdk/) 了解底层能力
