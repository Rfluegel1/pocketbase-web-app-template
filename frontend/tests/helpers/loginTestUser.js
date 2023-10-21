import { createTestUser } from './createTestUser.js';

export async function loginTestUser(page, email = undefined, password = undefined) {
	await createTestUser();

	await page.goto('/login');

	await page.fill('input[type="email"]', email || 'test.user@web-app-template.dev');
	await page.fill('input[type="password"]', password || process.env.TEST_USER_PASSWORD);

	await page.click('button[type="submit"]');
	await page.waitForTimeout(1000);
}
