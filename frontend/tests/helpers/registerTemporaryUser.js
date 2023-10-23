export async function registerTemporaryUser(page) {
	let email = `test.user-${Math.random()}@temporary.dev`;
	await page.goto('/register');
	await page.fill('input[type="email"]', email);
	await page.fill('input[id="password"]', 'password12');
	await page.fill('input[id="passwordConfirm"]', 'password12');
	await page.click('button[type="submit"]');
	return email;
}
