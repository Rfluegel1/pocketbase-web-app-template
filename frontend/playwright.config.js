const isStaging = process.env.NODE_ENV === 'staging';
const POCKETBASE_EXE = process.env.POCKETBASE_EXE || 'myapp';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	webServer: isStaging
		? undefined
		: {
				command: `npm run build && ../backend/pb/${POCKETBASE_EXE} serve`,
				port: 8090
		  },
	use: {
		baseURL: isStaging ? 'https://web-app-template.fly.dev/' : 'http://127.0.0.1:8090',
		screenshot: 'only-on-failure',
		video: 'retain-on-failure'
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(spec)\.[jt]s/,
	globalSetup: './tests/helpers/globalSetup.js',
	timeout: 15000
};

export default config;
