# generator-nd [![Build Status](https://secure.travis-ci.org/crossjs/generator-nd.png?branch=master)](https://travis-ci.org/crossjs/generator-nd)

> 通过命令行生成项目/组件目录及文件（前端部分）。


## 安装

- **安装 yo**

    ```bash
    npm install -g yo
    ```

- **安装 generator**

    ```bash
    npm install -g generator-nd
    ```

## 使用

### 项目目录结构

- **生成**

    ```bash
    yo nd
    ```

- **说明**

    ```
    |-static <外部目录，非本脚本生成>
        |-cfg/ <配置文件>
        |-dist/ <构建后的文件>
        |-src/ <源文件>
            |-css/ <样式表>
            |-fonts/ <字体>
            |-img/ <图片>
            |-js/ <Javascript>
            |-swf/ <Flash>
            |-theme/ <主题目录>
                |-default/ <默认主题>
                    |-css/ <样式表>
                    |-fonts/ <字体>
                    |-img/ <图片>
        |-.editorconfig
        |-.gitignore
        |-.jshintrc
        |-package.json
        |-README.md
    ```


### 组件目录结构

- **准备**

    *安装 spm*

    ```bash
    npm install -g spm
    ```

    *找到 spm 主目录，一般为 `C:\Users\Administrator\.spm`，修改 `spmrc-3x` 文件，增加如下文本：*

    ```
    [init]
    template = <替换为 spm 主目录>\spm-template
    ```

    *命令行终端进入 spm 主目录，拷贝 spm 模板，执行如下命令：*

    ```bash
    git clone --depth=1 git://github.com/crossjs/spm-template.git spm-template
    rm -rf spm-template/.git
    ```

- **生成**

    ```bash
    yo nd:module
    ```

- **说明**

    ```
    |-xxxxxx <外部目录，非本脚本生成>
        |-examples/
        |-docs/
        |-tests/
        |-src/
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


## 问题

### SASS 文件应该放在哪个目录？

- 某种意义上，SASS 文件也是 CSS 文件，所以存放在 CSS 目录。
- 同一个项目，除了要保持只用一种 CSS 预处理器。
- 同一个项目，不应出现 CSS 预处理器与 CSS 混用。

### coffee 文件应该放在哪个目录？

- 同 SASS，存放在 JS 目录，同时避免混用。
