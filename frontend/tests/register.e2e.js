import {test, expect} from '@playwright/test';
import {loginTestUser} from "./helpers/loginTestUser.js";
import PocketBase from "pocketbase";
import {authenticateAsAdmin} from "./helpers/authenticateAsAdmin.js";

test.describe('Register Page', () => {
    const pb = new PocketBase(process.env.BASE_URL)

    test('should register a new user and redirect to login', async ({page}) => {
        //given
        let email = `test.user-${Math.random()}@temporary.dev`;
        await page.goto('/register');
        await page.fill('input[type="email"]', email)
        await page.fill('input[id="password"]', 'password12')
        await page.fill('input[id="passwordConfirm"]', 'password12')

        try {
            // when
            await page.click('button[type="submit"]');
            await page.waitForTimeout(1000)

            // then
            await expect(page.url()).toBe(`${process.env.BASE_URL}/login`);

            // when
            await loginTestUser(page, email, 'password12')


            // then
            await expect(page.url()).toBe(`${process.env.BASE_URL}/`);

        } catch (e) {
            throw e
        } finally {
            // cleanup
            pb.authStore.clear();
            await authenticateAsAdmin(pb)
            const user = await pb.collection('users').getFirstListItem(`email="${email}"`)
            await pb.collection('users').delete(user.id)
        }
    })
});
