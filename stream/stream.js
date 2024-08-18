'use strict'

const fs = require('fs')

const server = require('http').createServer()

server.on('request', (req, res) => {
    const data = fs.createReadStream('C:/Users/nguye/Downloads/file_test.mp4')
    res.setHeader('Content-Disposition', 'attachment; filename="output.mp4"');
    data.pipe(res)
})

server.listen(3003)
process.title = 'node 3003 use stream'

console.log(`node 3003 use stream pid:: ${process.pid}`)