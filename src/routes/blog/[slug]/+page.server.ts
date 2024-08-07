import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const slug = params.slug as string;

	try {
		const record = await locals.pb
			.collection('posts')
			.getFirstListItem(`slug='${slug}'`, { expand: 'author' });
		return { record };
	} catch (error) {
		return {
			errorCode: 404
		};
	}
}) satisfies PageServerLoad;
