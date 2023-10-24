import { expect, test } from '@playwright/test';
import PocketBase from 'pocketbase';
import { loginTestUser } from './helpers/loginTestUser.js';
import { authenticateAsAdmin } from './helpers/authenticateAsAdmin.js';
import { registerTemporaryUser } from './helpers/registerTemporaryUser.js';

test.describe('Register Page', () => {
	const pb = new PocketBase(process.env.BASE_URL);

	test('should register a new user and notify user to verify their email', async ({ page }) => {
		// given
		let email;
		try {
			// when
			email = await registerTemporaryUser(page);
			const request = await page.waitForRequest('**/request-verification');

			// then
			await expect(request.url()).toMatch(/\/request-verification$/);
			await expect(
				page.locator('text="Please verify your email address, and then login "')
			).toBeVisible();

			// when
			await page.click('a[href="/login"]');

			// then
			await expect(page.locator('h1')).toHaveText('Login');

			// when
			await loginTestUser(page, email, 'password12');

			// then
			await expect(page.locator('h1')).toHaveText('Todo List');
		} finally {
			// cleanup
			await authenticateAsAdmin(pb);
			const user = await pb.collection('users').getFirstListItem(`email="${email}"`);
			await pb.collection('users').delete(user.id);
		}
	});

	test('user creation error displays message to client', async ({ page }) => {
		// given
		let email;
		try {
			email = await registerTemporaryUser(page);
			await page.goto('/register');

			// when
			await registerTemporaryUser(page, email);

			// then
			await expect(
				page.locator('text="There was an error registering your account"')
			).toBeVisible();
		} finally {
			await authenticateAsAdmin(pb);
			const user = await pb.collection('users').getFirstListItem(`email="${email}"`);
			await pb.collection('users').delete(user.id);
		}
	});

	test('should have link to login page', async ({ page }) => {
		// given
		await page.goto('/register');

		// when
		await page.click('a[href="/login"]');

		// then
		await expect(page.locator('h1')).toHaveText('Login');
	});

	test('should display mismatched password and passwordConfirm error', async ({ page }) => {
		// when
		await registerTemporaryUser(page, undefined, 'password12', 'password123');

		// then
		await expect(page.locator('text="Password and Confirm Password do not match"')).toBeVisible();
	});
});
