# generator-nd [![Build Status](https://secure.travis-ci.org/ndfront/generator-nd.png?branch=master)](https://travis-ci.org/ndfront/generator-nd)

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

## 使用

### 项目目录结构

- **生成**

    ```bash
    $ yo nd
    ```

- **说明**

    ```
    |-static <外部目录，非本脚本生成>
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
        |-themes/ <主题目录>
            |-default/
                |-css/ <样式>
                |-scss/ <SASS>
                |-fonts/ <字体>
                |-images/ <图片>
        |-.editorconfig
        |-.gitignore
        |-.jshintrc
        |-Gruntfile.js
        |-package.json
        |-README.md
    ```

### 组件目录结构

- **准备**

    *安装 spm*

    ```bash
    $ npm install -g spm
    ```

    *配置 spm*

    > 使用本地源

    ```bash
    $ spm config source:spm.url http://spm.crossjs.com
    ```

    *找到 spm 主目录，一般为 `C:\Users\Administrator\.spm`，修改 `spmrc-3x` 文件，增加如下文本：*

    ```
    [init]
    template = <替换为 spm 主目录>\spm-template
    ```

    *命令行终端进入 spm 主目录，拷贝 spm 模板，执行如下命令：*

    ```bash
    $ rm -rf spm-template && git clone --depth=1 git://github.com/crossjs/spm-template.git spm-template && rm -rf spm-template/.git
    ```

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
        |-Gruntfile.js
        |-HISTORY.md
        |-index.js
        |-package.json
        |-README.md
        |-travis.yml
    ```
