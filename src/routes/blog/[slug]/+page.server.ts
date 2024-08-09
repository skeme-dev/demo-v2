import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const slug = params.slug as string;

	try {
		const record = await locals.pb
			.collection('posts')
			.getFirstListItem(`slug='${slug}'`, { expand: 'author' });

		if (record.isPublished) {
			return { record };
		} else {
			return redirect(303, '/blog');
		}
	} catch (error) {
		console.error(error);

		throw redirect(303, '/blog');
	}
}) satisfies PageServerLoad;
