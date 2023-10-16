import {spawn} from 'child_process'
import * as path from 'path'
import * as fs from 'fs'

if (process.env.NODE_ENV === 'test') {
    process.env.NODE_ENV = 'development'
}
const env = process.env.NODE_ENV || 'development'
require('dotenv').config({path: `.env.${env}`})

export default async () => {
    const startBackend = () => new Promise((resolve) => {
        const server = spawn('./pocketbase', ['serve'])
        let pid = server.pid?.toString() ? server.pid?.toString() : 'pid undefined'
        console.log('\ncreated pocketbase server with pid:', pid)
        fs.writeFileSync(path.join(__dirname, 'server.pid'), pid)
        server.stdout.on('data', (data) => {
            const output = data.toString()
            if (output.includes('Server started at')) {
                resolve(server)
            }
        })
    })

    await startBackend()
};
