# 静态服务器
* **根据路径获取文件：**
    `node-dev server.js 8888`
* **解决不存在路径报错：**
 `try catch`
* **默认首页：**
    默认根目录 / 跳转首页
* **修改 `Content-Type` 静态服务器结束**
# 动态服务器
* **动态服务器开始：读取数据库**
    `response.setHeader('content-Type','text/html; charset=utf-8')`
    运行：`node 1.js`
* **数据库写入数据：**
    `user => users.json`
* **实现用户注册：**
    引入`jQuery` 获取 `name` 和 `password`
* **发送 POST 请求：**
    把数据放到请求第四部分发送请求
* **添加注册路由：**
    路径为 `/login` 走动态服务器
 `if(path === "/login" && method === "POST")`
* **用户注册，后台拿到数据：**
    监听请求事件：`request.on()` 知识点：`Buffer.concat(array).toString()`
* **用户注册数据写入数据库：**
    序列化：`JSON.parse()`
 * **实现登录页面：**
    注册成功跳转登录页面，登录跳转 `home` 页面显示用户名，无法确定当前用户，受阻。
 * **标记用户登录状态：**
    设置`Cookie`: `response.setHeader('Set-Cookie', 'loginess=1, HttpOnly')`,其中 `HttpOnly` 可以做到前端读取不到 `Cookie`，利用 `Cookie` 标记用户登录状态
* **修改 `home` 内容**
    通过 `logged` 改成 `user_id`，`home.html` 渲染前获取 `user` 信息 `if(user)` 替换内容
* **解决用户篡改 `user_id`**
    使用 `session.json` 把用户 `ID` 变成随机数发给浏览器隐匿 `ID`