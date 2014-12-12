# <%= appname %>

> <%= description %>

## 用法

- 项目构建

    ```bash
    $ grunt build
    ```

    构建后的 app 文件存放于 dist 目录，css 文件存放于 theme/default/css 目录

- 调试服务器

    ```bash
    $ grunt develop
    $ grunt release
    ```

    浏览器中访问 http://127.0.0.1:8851

    DEBUG 请访问 http://127.0.0.1:8851/?debug

## 样例

    ```html
    <script src="<%= appname %>/lib/seajs/sea.js"></script>
    <script src="<%= appname %>/lib/config.js"></script>
    <script>
      // <%= appname %>/app/**/*.js
      seajs.use('<%= appname %>/app/<folder>/<file>');
    </script>
    ```
