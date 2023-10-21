import PocketBase from 'pocketbase';

export default async () => {
	const createFirstAdmin = async () => {
		const pb = new PocketBase(process.env.BASE_URL);
		await pb.admins.create({
			email: process.env.PB_ADMIN_EMAIL,
			password: process.env.PB_ADMIN_PASSWORD,
			passwordConfirm: process.env.PB_ADMIN_PASSWORD
		});
	};

	if (process.env.CREATE_FIRST_ADMIN) {
		await createFirstAdmin();
	}
};
