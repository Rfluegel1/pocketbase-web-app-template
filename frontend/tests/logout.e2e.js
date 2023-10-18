import {expect, test} from '@playwright/test';
import PocketBase from "pocketbase";

test.describe('Logout page', () => {
    test('should log user out and redirect to login', async ({page}) => {
        // given user is logged in
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

        await page.click('button[type="submit"]');

        // when
        await page.goto('/logout');

        // then
        await expect(page.locator('h1')).toHaveText('Login');
    });
})
