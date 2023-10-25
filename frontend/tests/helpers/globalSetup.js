import PocketBase from 'pocketbase';
import {authenticateAsAdmin} from "./authenticateAsAdmin.js";

export default async () => {
		const pb = new PocketBase(process.env.BASE_URL);
	const createFirstAdmin = async () => {
		await pb.admins.create({
			email: process.env.PB_ADMIN_EMAIL,
			password: process.env.PB_ADMIN_PASSWORD,
			passwordConfirm: process.env.PB_ADMIN_PASSWORD
		});
	};

	const createTestUser = async () => {
		try {
			await authenticateAsAdmin(pb);
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

	if (process.env.CREATE_FIRST_ADMIN) {
		await createFirstAdmin();
	}

	await createTestUser();
};
