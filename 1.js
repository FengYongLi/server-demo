const fs = require('fs')

// 读取数据库
const usersString = fs.readFileSync('./db/users.json').toString()
const usersArray = JSON.parse(usersString)

// 写数据库
const user3 = {id:3,name:'tom',password:'ccc'}
//写的新数据放到数组数据中
usersArray.push(user3)
// 把符合json 语法的数组转为字符串
const string = JSON.stringify(usersArray)
// 读取更新后的数据库
fs.writeFileSync('./db/users.json', string)