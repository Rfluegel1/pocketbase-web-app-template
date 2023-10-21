import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

/** @type {import('./$types').LayoutServerLoad} */
export function load() {
	const pb = new PocketBase(process.env.BASE_URL);
	pb.authStore.clear();

	throw redirect(302, '/login');
}
