import {test, expect} from '@playwright/test';

test.describe('Register Page', () => {
    test('should have the necessary fields and button', async ({page}) => {
        // given
        await page.goto('/register');

        // expect
        const emailField = await page.locator('input[type="email"]');
        await expect(emailField).toBeVisible();

        const passwordField = await page.locator('[id="password"]');
        await expect(passwordField).toBeVisible();

        const passwordConfirmField = await page.locator('[id="passwordConfirm"]');
        await expect(passwordConfirmField).toBeVisible();

        const submitButton = await page.locator('button[type="submit"]');
        await expect(submitButton).toBeVisible();
    })
});
