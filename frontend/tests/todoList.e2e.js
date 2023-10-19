import {expect, test} from '@playwright/test';
import PocketBase from "pocketbase";
import {loginTestUser} from "./helpers/loginTestUser.js";

test.describe('Todo list page', () => {
    const pb = new PocketBase(process.env.BASE_URL)

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
        try {
            const password = process.env.NODE_ENV === 'staging'
                ? process.env.STAGING_PB_ADMIN_PASSWORD
                : process.env.PB_ADMIN_PASSWORD;
            await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, password)
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
            throw e
        } finally {
            // cleanup
            let record = await pb.collection('todos').getFirstListItem('task="squash bugs"')
            await pb.collection('todos').delete(record.id)
            record = await pb.collection('todos').getFirstListItem('task="sanitize"')
            await pb.collection('todos').delete(record.id)
            record = await pb.collection('todos').getFirstListItem('task="watch grass grow"')
            await pb.collection('todos').delete(record.id)
            pb.authStore.clear()
        }
    })

    test('should allow tasks to be created and deleted', async ({page}) => {
        //given
        await loginTestUser(page)
        await page.goto('/')
        try {
            // when
            await page.fill('input[id="task"]', 'test task');
            await page.click('button[id="create"]');

            // then
            await expect(page.locator('input[id="task"]')).toHaveValue('');

            // when
            await page.reload()

            // then
            await expect(page.locator('[data-testid="test task"]').first()).toHaveText('test task');

            // when
            await page.click('button[data-testid="delete test task"]');

            // then
            await expect(page.locator('text="test task"')).not.toBeVisible();

            // when
            await page.reload()

            // then
            await expect(page.locator('text="test task"')).not.toBeVisible();
        } catch (e) {
            throw e
        } finally {
            // cleanup
            pb.authStore.clear()
        }
    })

    test('empty task cannot be created', async ({page}) => {
        // given
        await loginTestUser(page)
        await page.goto('/')
        try {
            // when
            await page.click('button[id="create"]');

            // then
            await expect(page.locator('div[role="alert"]')).toHaveText('Task is required')
        } catch (e) {
            throw e
        } finally {
            // cleanup
            pb.authStore.clear()
        }
    })
})
