# 静态服务器
* **根据路径获取文件**
`node-dev server.js 8888`
* **解决不存在路径报错**
 `try catch`
* **默认首页**
 默认根目录 / 跳转首页
* **修改 `Content-Type` 静态服务器结束**
# 动态服务器
* **动态服务器开始：读取数据库**
`response.setHeader('content-Type','text/html; charset=utf-8')`
 node 1.js
* **数据库写入数据**
 `user => users.json`
* **实现用户注册**
 引入`jQuery` 获取 `name` 和 `password`
* **发送 POST 请求**
 把数据放到请求第四部分发送请求
* **添加注册路由**
 路径为 `/login` 走动态服务器
 `if(path === "/login" && method === "POST")`
* **用户注册，后台拿到数据**
监听请求事件：`request.on()` 知识点：`Buffer.concat(array).toString()`