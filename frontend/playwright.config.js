const isStaging = process.env.NODE_ENV === 'staging';
const POCKETBASE_EXE = process.env.POCKETBASE_EXE || 'macos_arm64_pocketbase'

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    webServer: isStaging ? undefined : {
        command: `npm run build && ../backend/pb/${POCKETBASE_EXE} serve`,
        port: 8090,
    },
    use: {
        baseURL: process.env.BASE_URL,
    },
    testDir: 'tests',
    testMatch: /(.+\.)?(e2e)\.[jt]s/
};

export default config;
