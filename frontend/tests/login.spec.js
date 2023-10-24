import { test, expect } from '@playwright/test';
import { loginTestUser } from './helpers/loginTestUser.js';

test.describe('Login Page', () => {
	test('valid login should redirect to todoList', async ({ page }) => {
		// when
		await loginTestUser(page);

		// then
		await expect(page.locator('h1')).toHaveText('Todo List');
	});

	test('invalid login displays error message', async ({ page }) => {
		// when
		await loginTestUser(page, 'invalid@invalid.invalid', 'invalid');

		// then
		await expect(page.locator('text="Invalid email or password"')).toBeVisible();
	});

	test('logged in user should be redirected to todoList when visiting login page', async ({
		page
	}) => {
		// given
		await loginTestUser(page);

		// expect
		await expect(page.locator('h1')).toHaveText('Todo List');

		// when
		await page.goto('/login');

		// then
		await expect(page.locator('h1')).toHaveText('Todo List');
	});

	test('link to create user routes to register page', async ({ page }) => {
		// given
		await page.goto('/login');

		// when
		await page.click('a[href="/register"]');

		// then
		await expect(page.locator('h1')).toHaveText('Register');
	});

	test('should display other error message', async ({ page, context }) => {
		// given
		await context.route('**/auth-with-password', (route) => {
			route.fulfill({
				status: 500
			});
		});

		// when
		await loginTestUser(page, 'other@error.com');

		// then
		await expect(page.locator('text="Something went wrong. Please try again."')).toBeVisible();
	});
});
