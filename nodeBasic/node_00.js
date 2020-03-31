// // 内置模块调用
// const os = require('os');
// const mem = os.freemem() / os.totalmem() * 100;
// console.log(`内存占用率${mem}%`);

// // 第三方库调用
// const cpuState = require('cpu-stat');
// cpuState.usagePercent((err, percent) => {
//     console.log(`CPU 占用${percent}%`)
// })

// const os = require('os');
// const cpuState = require('cpu-stat');

// getState = () => {
//     const mem = os.freemem() / os.totalmem() * 100;
//     console.log(`内存占用率${mem}%`);
//     cpuState.usagePercent((err, percent) => {
//         console.log(`CPU 占用${percent}%`)
//     })
// }

// setInterval(getState, 1200)


// const { getState } = require('./node_state');
// setInterval(getState, 1200)



/**************  fs  ****************** */ 
// const fs = require('fs');
// const data = fs.readFileSync('../package.json'); // Buffer
// console.log(data.toString()) // toString 默认使用utf-8格式：toString('utf-8)

// const fs = require('fs');
// fs.readFile('../package.json', (err, data) => {
//     console.log(data.toString())
// })

// const fs = require('fs');
// const { promisify } = require('util')
// const readFile = promisify(fs.readFile);
// readFile('../package.json').then(data => {
//     console.log(data.toString())
// })

(async () => {
    const fs = require('fs');
    const { promisify } = require('util')
    const readFile = promisify(fs.readFile);
    const data = await readFile('../package.json')
    console.log("file:", data.toString())
})()



/*****************  Buffer  ****************** */
const buf1 = Buffer.alloc(10); // 开辟了一段内存空间 10个字节
// console.log(buf1)

// const buf2 = Buffer.from([1,2,3]); // 2进制的复值
// console.log(buf2)

const buf3 = Buffer.from('Buffer创建方法');
// console.log(buf3.toString())

buf1.write('hello'); // 写入

// console.log('buf1', buf1);

const buf4 = Buffer.concat([buf1, buf3]) // 拼接
console.log('buf4', buf4.toString(), "---", buf4.toJSON());




/*****************  Http请求搭建一个简单的Server  ****************** */
const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    const {url, method, headers} = req;
    // console.log('request',url, method);
    
    // res.end('wwwwww....')
    if (url === '/' && method === 'GET') {
        fs.readFile('./node_index.html', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8'})
                res.end('Server Error 服务器错误')
            }
            res.statusCode = 200
            res.setHeader("Content-Type", 'text/html')
            res.end(data)
        })
    } else if (url === '/users' && method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({name: 'crystal'}))
    } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) { // 读一个文件
        fs.createReadStream('.' + url).pipe(res)
    }
})
server.listen(3000)


/*****************  Express服务器  ****************** */
// const express = require('express');
// const app = express()
// app.get('/', (req, res) => {
//     res.end('Hello..')
// })
// app.get('/user', (req, res) => {
//     res.end(JSON.stringify({name: 'le'}))
// })
// app.listen(3000, () => {
//     console.log('App listen at 3000')
// })