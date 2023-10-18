// login.spec.js
import {test, expect} from '@playwright/test';
import {createDevelopmentTestUser} from "./helpers/createDevelopmentTestUser.js";
import {loginTestUser} from "./helpers/loginTestUser.js";

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
            await createDevelopmentTestUser()
        }

        // when
        await loginTestUser(page)

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
