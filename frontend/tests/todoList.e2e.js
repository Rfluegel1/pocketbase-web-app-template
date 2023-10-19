import {expect, test} from '@playwright/test';
import PocketBase from "pocketbase";
import {loginTestUser} from "./helpers/loginTestUser.js";
π
test.describe('Todo list page', () => {
    test('should redirect when user is not logged in', async ({page}) => {
        // given
        await page.goto('/logout');

        // when
        await page.goto('/');

        // then
        await expect(page.locator('h1')).toHaveText('Login');
    });

    test('should display only todo records made by test.user', async ({page}) => {
        // given
        await loginTestUser(page)
        const pb = new PocketBase(process.env.BASE_URL)
        try {
            await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASSWORD)
            const testUser = await pb.collection('users').getFirstListItem('email="test.user@web-app-template.dev"')
            await pb.collection('todos').create({task: 'squash bugs', createdBy: testUser.id})
            await pb.collection('todos').create({task: 'sanitize', createdBy: testUser.id})
            await pb.collection('todos').create({task: 'watch grass grow', createdBy: 'someone else'})

            // when
            await page.goto('/');

            // then
            await expect(page.locator('[data-testid="squash bugs"]').first()).toHaveText('squash bugs');
            await expect(page.locator('[data-testid="sanitize"]').first()).toHaveText('sanitize');
            await expect(page.locator('text="watch grass grow"')).not.toBeVisible();
        } catch (e) {
            console.error(e)
            console.log(process.env.PB_ADMIN_EMAIL)
            console.log(process.env.PB_ADMIN_PASSWORD)
        } finally {
            // cleanup
            const record = await pb.collection('todos').getFirstListItem('task="squash bugs"')
            await pb.collection('todos').delete(record.id)
            pb.authStore.clear()
        }
    })
})
