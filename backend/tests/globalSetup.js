import {spawn} from 'child_process'
import * as path from 'path'
import * as fs from 'fs'

if (process.env.NODE_ENV === 'test') {
    process.env.NODE_ENV = 'development'
}
const env = process.env.NODE_ENV || 'development'
const POCKETBASE_EXE = process.env.POCKETBASE_EXE || 'myapp'
require('dotenv').config({path: `.env.${env}`})

export default async () => {
    const startBackend = () => new Promise((resolve) => {
        const myAppPath = path.join(__dirname, '../', 'pb', 'myapp');
        try {
            fs.unlinkSync(myAppPath)
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw err
            }
        }
        const build = spawn('npm', ['run', 'build']);
        build.on('close', code => {
            if (code !== 0) {
                console.error('error creating exe')
            }
        })
        while (!fs.existsSync(myAppPath)) {
        }
        const server = spawn(`./pb/${POCKETBASE_EXE}`, ['serve']);
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

    if (env === 'development') {
        await startBackend()
    }
};
