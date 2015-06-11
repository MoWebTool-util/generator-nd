# generator-nd

Deprecated. use [dong](https://github.com/crossjs/dongg) init instead.

[![NPM version](https://img.shields.io/npm/v/generator-nd.svg?style=flat-square)](https://npmjs.org/package/generator-nd)
[![Build Status](https://img.shields.io/travis/ndfront/generator-nd.svg?style=flat-square)](https://travis-ci.org/ndfront/generator-nd)
[![NPM downloads](http://img.shields.io/npm/dm/generator-nd.svg?style=flat-square)](https://npmjs.org/package/generator-nd)
[![David](http://img.shields.io/david/ndfront/generator-nd.svg?style=flat-square)](https://npmjs.org/package/generator-nd)
[![David](http://img.shields.io/david/dev/ndfront/generator-nd.svg?style=flat-square)](https://npmjs.org/package/generator-nd)

> Yeoman 生成器，用于生成基于 SeaJS/SPM 的前端项目/组件文件结构，样例代码见 [examples](https://github.com/ndfront/examples)。


## 安装

- **安装 yo**

    ```bash
    $ npm install -g yo
    ```

- **安装 generator**

    ```bash
    $ npm install -g generator-nd
    ```

- **安装 spm**

    ```bash
    $ npm install -g spm
    ```

## 使用

### 项目目录结构

- **生成**

    ```bash
    $ yo nd
    ```

- **说明**

    ```
    |-<name> <外部目录，非本脚本生成>
        |-app/ <业务模块>
        |-dist/ <构建后的 APP 文件>
        |-lib/ <通用的第三方库>
            |-seajs/
                |-sea.js
                |-sea-debug.js
            |-config.js <配置文件，READONLY>
            |-config.js.tpl <配置文件模板>
        |-mod/ <通用模块，非业务类>
        |-node_modules/ <NPM 模块>
        |-spm_modules/ <SPM 模块>
        |-theme/ <主题目录>
            |-default/
                |-css/ <样式>
                |-scss/ <SASS>
                |-font/ <字体>
                |-img/ <图片>
        |-.editorconfig
        |-.gitignore
        |-.jshintrc
        |-Gruntfile.js
        |-package.json
        |-README.md
    ```

### 组件目录结构

- **生成**

    ```bash
    $ mkdir <name>
    $ cd <name>
    $ yo nd:module
    ```

- **说明**

    ```
    |-<name> <外部目录，非本脚本生成>
        |-examples/
        |-node_modules/
        |-spm_modules/
        |-tests/
        |-.editorconfig
        |-.gitignore
        |-.jshintrc
        |-.spmignore
        |-.travis.yml
        |-Gruntfile.js
        |-HISTORY.md
        |-index.js
        |-package.json
        |-README.md
    ```
