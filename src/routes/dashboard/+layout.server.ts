import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = async ({ locals, route }) => {
	if (!locals.pb.authStore.model && route.id !== '/dashboard/login') {
		throw redirect(307, '/dashboard/login');
	}

	return {
		user: JSON.parse(JSON.stringify(locals.pb.authStore.model))
	};
};
