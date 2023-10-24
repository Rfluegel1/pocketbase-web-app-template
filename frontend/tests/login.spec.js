import { test, expect } from '@playwright/test';
import { loginTestUser } from './helpers/loginTestUser.js';

test.describe('Login Page', () => {
	test('valid login should redirect to todoList', async ({ page }) => {
		// when
		await loginTestUser(page);

		// then
		await expect(page.url()).toBe(`${process.env.BASE_URL}/`);
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

		// when
		await page.goto('/login');

		// then
		await page.waitForSelector('text="Todo List"');
		await expect(page.url()).toBe(`${process.env.BASE_URL}/`);
	});

	test('link to create user routes to register page', async ({ page }) => {
		// given
		await page.goto('/login');

		// when
		await page.click('a[href="/register"]');

		// then
		await page.waitForSelector('text="Register"');
		await expect(page.url()).toBe(`${process.env.BASE_URL}/register`);
	});
});
