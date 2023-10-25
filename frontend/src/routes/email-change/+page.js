import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

/** @type {import('./$types').LayoutServerLoad} */
export function load() {
	const pb = new PocketBase(process.env.BASE_URL);
	const loggedIn = pb.authStore.isValid;
	if (!loggedIn) {
		throw redirect(302, '/login');
	}
}
