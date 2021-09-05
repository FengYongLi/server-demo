var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
  if (path === "/login" && method === "POST") {
    response.setHeader('content-Type', 'text/html; charset=utf-8')
    // 需要先读取数据库 下边查找下标最大的会用到
    const userArray = JSON.parse(fs.readFileSync('./db/users.json'))
    // 由于不确认数据长度大小，需要批次上传，声明一个空数组来获取批次内容
    const array = []
    request.on('data', (chunk) => {
      array.push(chunk)
    })
    request.on('end', () => {
      // 用 Buffer.concat() 把数据链接为字符串
      const string = Buffer.concat(array).toString()
      // 转为对象
      const obj = JSON.parse(string)
      // 最后一个也就是下标最大的是第 length - 1 个 
      const lastUser = userArray[userArray.length - 1]
      // 新数据
      const newUser = {
        // 如果不为空就最大下标 + 1 为空 id 就为 1
        id: lastUser ? lastUser.id + 1 : 1,
        // 新数据的 {name, password} = obj
        name: obj.name,
        password: obj.password
      }
      // 新数组的数放到原数组内
      userArray.push(newUser)
      // 把 userArray 数组对象转为 JSON 字符串 存入
      fs.writeFileSync("./db/users.json", JSON.stringify(userArray))
      response.end()
    })
  }else{
  response.statusCode = 200;
  const filePath = path === '/' ? '/index.html' : path
  const index = filePath.lastIndexOf('.')
  const suffix = filePath.substring(index)
  const fileType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.xml': 'text/xml',
    '.json': 'text/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg'
  }
  response.setHeader('Content-Type', `${fileType[suffix] || 'text/html'};charset=utf-8`);
  let content;
  try {
    content = fs.readFileSync(`./public${filePath}`);
  } catch (error) {
    content = '文件不存在';
    response.statusCode = 404;
  }
  response.write(content);
  response.end();
  }


  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)