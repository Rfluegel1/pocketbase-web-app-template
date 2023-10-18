// login.spec.js
import {test, expect} from '@playwright/test';
import PocketBase from 'pocketbase'

test.describe('Login Page', () => {
    test('should have the necessary fields and button', async ({page}) => {
        // given
        await page.goto('/login');

        // expect
        const emailField = await page.locator('input[type="email"]');
        await expect(emailField).toBeVisible();

        const passwordField = await page.locator('input[type="password"]');
        await expect(passwordField).toBeVisible();

        const submitButton = await page.locator('button[type="submit"]');
        await expect(submitButton).toBeVisible();
    });

    test('valid login should display username and remove form', async ({page}) => {
        // given
        if (process.env.NODE_ENV === 'github') {
            try {
                const pb = new PocketBase('http://127.0.0.1:8090')
                let email = 'test.user@web-app-template.dev';
                let password = process.env.TEST_USER_PASSWORD;
                await pb.collection("users").create({
                    email,
                    password,
                    passwordConfirm: password,
                });
            } catch (e) {
                if (e.response.data.email.message !== 'The email is invalid or already in use.') {
                    throw e
                }
            }
        }
        await page.goto('/login');

        await page.fill('input[type="email"]', 'test.user@web-app-template.dev');
        await page.fill('input[type="password"]', process.env.TEST_USER_PASSWORD);

        // when
        await page.click('button[type="submit"]');

        // then
        await expect(page.locator('h1')).toHaveText('Welcome, test.user@web-app-template.dev');
        const emailField = await page.locator('input[type="email"]');
        await expect(emailField).not.toBeVisible();

        const passwordField = await page.locator('input[type="password"]');
        await expect(passwordField).not.toBeVisible();

        const submitButton = await page.locator('button[type="submit"]');
        await expect(submitButton).not.toBeVisible();
    })
});
