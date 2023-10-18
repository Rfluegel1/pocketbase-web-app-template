const isStaging = process.env.NODE_ENV === 'staging';

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    webServer: isStaging ? undefined : {
        command: 'npm run build && npm run preview',
        port: 4173,
    },
    use: {
        baseURL: isStaging ? 'https://web-app-template.fly.dev/' : 'http://localhost:4173',
    },
    testDir: 'tests',
    testMatch: /(.+\.)?(e2e)\.[jt]s/
};

export default config;
