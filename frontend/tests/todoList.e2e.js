import {expect, test} from '@playwright/test';
test.describe('Todo list page', () => {
    test('should redirect when user is not logged in', async ({page}) => {
        // given
        await page.goto('/logout');

        // when
        await page.goto('/');

        // then
        await expect(page.locator('h1')).toHaveText('Login');
    });
})
