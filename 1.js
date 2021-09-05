const fs = require('fs')
// 读取数据
const usersString = fs.readFileSync('./db/users.json').toString()
const usersArray = JSON.parse(usersString)

console.log(typeof usersString)
console.log(usersString)

console.log(typeof usersArray)
console.log(usersArray instanceof Array)
console.log(usersArray)