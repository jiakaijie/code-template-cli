# code-template-cli

快速创建项目 cli

## 环境

### 本地开发

Node 环境：v16.16.0

npm install

启动服务：npm run dev

### 打包

Node 环境：v16.16.0

npm run build

## 发布 npm 包

修改 package.json 中 version 版本号

选好对应的 npm 镜像源

npm login 完成

npm publish

# 目录

bin: 纯 Nodejs 执行脚本

scripts: 纯打包脚本

src: 源代码

dist: 开发 + 打包发布代码