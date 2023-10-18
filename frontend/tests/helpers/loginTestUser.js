export async function loginTestUser(page) {
    await page.goto('/login');

    await page.fill('input[type="email"]', 'test.user@web-app-template.dev');
    await page.fill('input[type="password"]', process.env.TEST_USER_PASSWORD);

    await page.click('button[type="submit"]');
}