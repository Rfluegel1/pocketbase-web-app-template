import {expect, test} from '@playwright/test';
import PocketBase from "pocketbase";
import {loginTestUser} from "./helpers/loginTestUser.js";

test.describe('Todo list page', () => {
    test('should redirect when user is not logged in', async ({page}) => {
        // given
        await page.goto('/logout');

        // when
        await page.goto('/');

        // then
        await expect(page.locator('h1')).toHaveText('Login');
    });

    test('should display all todo records', async ({page}) => {
        // given
        await loginTestUser(page)
        const pb = new PocketBase(process.env.BASE_URL)
        try {
            await pb.collection('todos').create({task: 'squash bugs'})

            // when
            await page.goto('/');

            // then
            await expect(page.locator('li').first()).toHaveText('squash bugs');

        } finally {
            // cleanup
            const record = await pb.collection('todos').getFirstListItem('task="squash bugs"')
            await pb.collection('todos').delete(record.id)
        }
    })
})
