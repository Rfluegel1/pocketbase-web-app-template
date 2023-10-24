import { expect, test } from '@playwright/test';
import PocketBase from 'pocketbase';
import { loginTestUser } from './helpers/loginTestUser.js';
import { authenticateAsAdmin } from './helpers/authenticateAsAdmin.js';

test.describe('Register Page', () => {
	const pb = new PocketBase(process.env.BASE_URL);

	test('should register a new user and notify user to verify their email', async ({ page }) => {
		//given
		let email = `test.user-${Math.random()}@temporary.dev`;
		await page.goto('/register');
		await page.fill('input[type="email"]', email);
		await page.fill('input[id="password"]', 'password12');
		await page.fill('input[id="passwordConfirm"]', 'password12');
		const requestPromise = page.waitForRequest('**/request-verification');

		try {
			// when
			await page.click('button[type="submit"]');
			const request = await requestPromise;

			// then
			await expect(request.url()).toMatch(/\/request-verification$/);
			await expect(
				page.locator('text="Please verify your email address, and then login "')
			).toBeVisible();

			// when
			await page.click('a[href="/login"]');

			// then
			await page.waitForSelector('text="Login"');
			expect(page.url()).toBe(`${process.env.BASE_URL}/login`);

			// when
			await loginTestUser(page, email, 'password12');

			// then
			await expect(page.url()).toBe(`${process.env.BASE_URL}/`);
		} finally {
			// cleanup
			pb.authStore.clear();
			await authenticateAsAdmin(pb);
			const user = await pb.collection('users').getFirstListItem(`email="${email}"`);
			await pb.collection('users').delete(user.id);
		}
	});

	test('user creation error displays message to client', async ({ page }) => {
		// given
		let email = `test.user-${Math.random()}@temporary.dev`;
		await page.goto('/register');
		await page.fill('input[type="email"]', email);
		await page.fill('input[id="password"]', 'password12');
		await page.fill('input[id="passwordConfirm"]', 'password12');
		try {
			await page.click('button[type="submit"]');
			await page.goto('/register');

			// when
			await page.fill('input[type="email"]', email);
			await page.fill('input[id="password"]', 'password12');
			await page.fill('input[id="passwordConfirm"]', 'password12');
			await page.click('button[type="submit"]');

			// then
			await expect(
				page.locator('text="There was an error registering your account"')
			).toBeVisible();
		} finally {
			pb.authStore.clear();
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
		await page.waitForSelector('text="Login"');
		expect(page.url()).toBe(`${process.env.BASE_URL}/login`);
	});
});
