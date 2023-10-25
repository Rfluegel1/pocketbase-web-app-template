import { expect, test } from '@playwright/test';

test.describe('Password reset page', () => {
	test('should call to password reset when email is submitted and link to login', async ({
		page
	}) => {
		// given
		await page.goto('/password-reset');
		await page.fill('input[type="email"]', 'test.user@temporary.com');

		// Start listening for the request before clicking the submit button
		const requestPromise = page.waitForRequest('**/request-password-reset');

		// when
		await page.click('button[type="submit"]');

		// Await the request promise
		const request = await requestPromise;

		// then
		await page.waitForSelector('text="Password reset email sent"');
		await expect(request.url()).toMatch(/\/request-password-reset$/);

		// when
		await page.click('a[href="/login"]');

		// then
		await expect(page.locator('h1')).toHaveText('Login');
	});
});
