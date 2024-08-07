import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const users = await locals.pb.collection('users').getFullList();
	const department = await locals.pb.collection('departments').getOne(params.departmentId, {
		expand: 'leader,teams'
	});
	return { department, users };
}) satisfies PageServerLoad;
