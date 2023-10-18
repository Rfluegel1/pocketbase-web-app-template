/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	webServer: {
		command: process.env.NODE_ENV === 'staging' ? null : 'npm run build && npm run preview',
		port: 4173,
	},
	use: {
		baseURL: process.env.NODE_ENV === 'staging' ? 'https://web-app-template.fly.dev/' : 'http://localhost:4173',
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(e2e)\.[jt]s/,
};

export default config;
