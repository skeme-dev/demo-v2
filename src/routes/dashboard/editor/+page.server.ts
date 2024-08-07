import type { PageServerLoad } from './$types';

export const load = (async ({ locals, url }) => {
	const id = url.searchParams.get('pid') as string;

	if (id) {
		const record = await locals.pb.collection('posts').getOne(id);
		return { record };
	}

	return {};
}) satisfies PageServerLoad;
