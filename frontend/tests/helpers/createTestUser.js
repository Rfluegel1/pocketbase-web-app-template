import PocketBase from 'pocketbase';

export async function createTestUser() {
	try {
		const pb = new PocketBase(process.env.BASE_URL);
		let email = 'test.user@web-app-template.dev';
		let password = process.env.TEST_USER_PASSWORD;
		await pb.collection('users').create({
			email,
			password,
			passwordConfirm: password
		});
		let user = await pb.collection('users').getFirstListItem(`email="${email}"`);

		user.verified = true;

		await pb.collection('users').update(user.id, user);
	} catch (e) {
		if (e.response.data.email.message !== 'The email is invalid or already in use.') {
			throw e;
		}
	}
}
