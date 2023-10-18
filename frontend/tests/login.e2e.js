// login.spec.js
import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
    test('should have the necessary fields and button', async ({ page }) => {
        // Navigate to the login page
        await page.goto('/login');

        // Check for the email input field
        const emailField = await page.locator('input[type="email"]');
        await expect(emailField).toBeVisible();

        // Check for the password input field
        const passwordField = await page.locator('input[type="password"]');
        await expect(passwordField).toBeVisible();

        // Check for the submit button
        const submitButton = await page.locator('button[type="submit"]');
        await expect(submitButton).toBeVisible();
    });
});
