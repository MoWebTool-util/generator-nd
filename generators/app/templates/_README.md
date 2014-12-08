# <%= appname %>

> <%= description %>

## 用法

- 项目构建

    ```bash
    $ grunt build
    ```

    构建后的 app 文件存放于 dist 目录，css 文件存放于 themes/default/css 目录

- 调试服务器

    ```bash
    $ grunt server
    ```

    浏览器中访问 http://127.0.0.1:8080

    DEBUG 请访问 http://127.0.0.1:8080/?debug

## 样例

    ```html
    <script src="<package name>/lib/seajs/sea.js"></script>
    <script src="<package name>/lib/config.js"></script>
    <script>
      // app/**/*.js
      seajs.use('<package name>/app/<folder>/<file>');
    </script>
    ```
