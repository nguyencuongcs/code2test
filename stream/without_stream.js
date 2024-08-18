'use strict'

const fs = require('fs')

const server = require('http').createServer()

server.on('request', (req, res) => {
    fs.readFile('C:/Users/nguye/Downloads/file_test.mp4', (err, data) => {
        if (err) throw err

        res.end(data)
    })
})

server.listen(3000)
process.title = 'node 3000 without stream'

console.log(`node 3000 without stream pid:: ${process.pid}`)