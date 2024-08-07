import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const posts = await locals.pb
		.collection('posts')
		.getList(1, 50, { filter: 'isPublished = true', sort: '-created' });

	console.log(posts);
	return { posts };
}) satisfies PageServerLoad;
