import fs from 'fs'
import path from 'path'
import {spawn} from 'child_process'

if (process.env.NODE_ENV === 'test') {
    process.env.NODE_ENV = 'development'
}
const env = process.env.NODE_ENV || 'development'
export default async () => new Promise((resolve, reject) => {
    function killBackend() {
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
    }

    if (env === 'development') {
        killBackend()
    }
});