import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, url }) => {
	const id = url.searchParams.get('pid') as string;

	if (id) {
		try {
			const record = await locals.pb.collection('posts').getOne(id);
			return { record };
		} catch (error) {
			throw redirect(303, '/dashboard/editor');
		}
	}

	return {};
}) satisfies PageServerLoad;
