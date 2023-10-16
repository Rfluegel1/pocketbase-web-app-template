import {spawn} from 'child_process'
import * as path from 'path'
import * as fs from 'fs'

if (process.env.NODE_ENV === 'test') {
    process.env.NODE_ENV = 'development'
}
const env = process.env.NODE_ENV || 'development'
const POCKETBASE_EXE = process.env.POCKETBASE_EXE || './macos_arm64_pocketbase'
require('dotenv').config({path: `.env.${env}`})

export default async () => {
    const startBackend = () => new Promise((resolve) => {
        const server = spawn(`./${POCKETBASE_EXE}`, ['serve']);
        let pid = server.pid?.toString() ? server.pid?.toString() : 'pid undefined'
        console.log('\ncreated macos_arm64_pocketbase server with pid:', pid)
        fs.writeFileSync(path.join(__dirname, 'server.pid'), pid)
        server.stdout.on('data', (data) => {
            const output = data.toString()
            console.log(output)
            if (output.includes('Server started at')) {
                console.log('server started')
                resolve(server)
            }
        })
        server.on('error', (error) => {
            console.error('Error starting server:', error);
        });
        server.stderr.on('data', (data) => {
            console.error('Server stderr:', data.toString());
        });

    })

    await startBackend()
};
