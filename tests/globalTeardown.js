import fs from 'fs'
import path from 'path'
import {spawn} from 'child_process'

export default async () => new Promise((resolve, reject) => {
    let filepath = path.join(__dirname, 'server.pid')
    const pid = fs.readFileSync(filepath).toString()
    const server = spawn('kill', ['-9', pid])

    server.on('exit', (code) => {
        if (code === 0) {
            console.log('killed pid:', pid)
            fs.unlinkSync(filepath)
            resolve(server)
        } else {
            reject(new Error('Failed to kill process'))
        }
    })
});