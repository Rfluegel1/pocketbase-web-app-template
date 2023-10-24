import { expect, test } from '@playwright/test';
import { loginTestUser } from './helpers/loginTestUser.js';

test.describe('Logout page', () => {
	test('should log user out and redirect to login', async ({ page }) => {
		// given
		await loginTestUser(page);

		// when
		await page.goto('/logout');

		// then
		await page.waitForSelector('text="Login"');
		await expect(page.url()).toBe(`${process.env.BASE_URL}/login`);
	});
});
