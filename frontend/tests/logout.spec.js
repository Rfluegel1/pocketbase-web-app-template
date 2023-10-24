import { expect, test } from '@playwright/test';
import { loginTestUser } from './helpers/loginTestUser.js';

test.describe('Logout page', () => {
	test('should log user out and redirect to login', async ({ page }) => {
		// given
		await loginTestUser(page);

		// when
		await page.goto('/logout');

		// then
		await expect(page.locator('h1')).toHaveText('Login');
	});
});
