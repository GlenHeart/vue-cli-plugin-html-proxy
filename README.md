# vue-cli-plugin-proxy

## 简介

- 代理基座应用，劫持访问路径到本地开发项目

### 项目配置

- 子项目添加dev-config.js
  1. extraCookie support
  2. exchange

  ```js
  exchange: {
    mianSystemUrl: 基座系统地址,
    remoteUrl: 线上子系统地址,
    localUrl: 需要代理到的地址
  }
  ```

  3. proxy 是一个fuction 返回的回合vue.config中得proxy合并

- 子项目打包处理
