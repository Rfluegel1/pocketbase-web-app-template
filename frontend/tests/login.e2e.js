// login.spec.js
import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
    test('should have the necessary fields and button', async ({ page }) => {
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

    (process.env.NODE_ENV === 'github' ? test.skip : test)('valid login should display username', async ({ page }) => {
        // given
        await page.goto('/login');

        await page.fill('input[type="email"]', 'test.user@web-app-template.dev');
        await page.fill('input[type="password"]', process.env.TEST_USER_PASSWORD);

        // when
        await page.click('button[type="submit"]');

        // then
        await expect(page.locator('h1')).toHaveText('Welcome, test.user@web-app-template.dev');
    })
});
