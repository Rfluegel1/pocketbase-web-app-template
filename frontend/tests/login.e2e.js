import {test, expect} from '@playwright/test';
import {loginTestUser} from "./helpers/loginTestUser.js";

test.describe('Login Page', () => {
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
