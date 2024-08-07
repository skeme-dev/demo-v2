import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const user = locals.pb.authStore.model;
	return { user };
}) satisfies PageServerLoad;
