# generator-nd [![Build Status](https://secure.travis-ci.org/crossjs/generator-nd.png?branch=master)](https://travis-ci.org/crossjs/generator-nd)

> 通过命令行生成项目目录及文件（前端部分）。


**安装 yo**

```bash
npm install -g yo
```

**安装 generator**

```bash
npm install -g generator-nd
```

**使用 generator**

```bash
yo nd
```

生成项目目录结构：

```
|-static <外部目录，非本脚本生成>
    |-cfg/ <配置文件>
    |-dist/ <构建后的文件>
    |-src/ <源文件>
        |-css/ <样式表>
        |-font/ <字体>
        |-img/ <图片>
        |-js/ <Javascript>
        |-swf/ <Flash>
        |-theme/ <主题目录>
            |-default/ <默认主题>
                |-css/ <样式表>
                |-font/ <字体>
                |-img/ <图片>
    |-.editorconfig
    |-.gitignore
    |-.jshintrc
    |-package.json
    |-README.md
```

**安装 spm**

```bash
npm install -g spm
```

**使用 sub generator**

```bash
yo nd:module
```

生成组件目录结构：

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
