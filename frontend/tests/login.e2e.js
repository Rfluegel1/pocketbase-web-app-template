import {test, expect} from '@playwright/test';
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

    test('valid login should redirect to todoList', async ({page}) => {
        // when
        await loginTestUser(page)

        // then
        await expect(page.url()).toBe(`${process.env.BASE_URL}/`);
    })

    test('invalid login displays error message', async ({page}) => {
        // when
        await loginTestUser(page, 'invalid@invalid.invalid', 'invalid')

        // then
        await expect(page.locator('text="Invalid email or password"')).toBeVisible();
    })
});
