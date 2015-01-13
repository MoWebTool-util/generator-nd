# <%= appname %>

[![spm version](http://spmjs.io/badge/<%= appname %>)](http://spmjs.io/package/<%= appname %>)

> <%= description %>

## 安装

```bash
$ spm install <%= appname %> --save
```

## 使用

```js
var <%= varname %> = require('<%= appname %>');
// use <%= varname %>
```
## 开发

### 本地 Web 服务

```bash
grunt
```

浏览器中访问 http://127.0.0.1:8851

### 生成/查看 API 文档

```bash
grunt doc
grunt
```

浏览器中访问 http://127.0.0.1:8851/doc

### 代码检查与单元测试

```bash
grunt test
```

### 发布组件到 SPM 源

```bash
grunt publish
```
