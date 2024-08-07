import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const id = params.previewId as string;

	try {
		const record = await locals.pb.collection('posts').getOne(id, { expand: 'author' });
		return { record };
	} catch (error) {
		return {
			errorCode: 404
		};
	}
}) satisfies PageServerLoad;
