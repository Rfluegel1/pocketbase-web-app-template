export async function authenticateAsAdmin(pb) {
	const password =
		process.env.NODE_ENV === 'staging'
			? process.env.STAGING_PB_ADMIN_PASSWORD
			: process.env.PB_ADMIN_PASSWORD;
	await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, password);
}
