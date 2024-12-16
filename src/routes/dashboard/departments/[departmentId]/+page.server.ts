import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const users = await locals.pb.collection('users').getFullList();
	const department = await locals.pb.collection('departments').getOne(params.departmentId, {
		expand: 'leader,teams'
	});
	return { department, users };
}) satisfies PageServerLoad;

export const actions: Actions = {
	createTeam: async ({ request, locals, params }) => {
		const formData = await request.formData();
		const departmentId = params.departmentId as string;
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const userId = formData.get('userId') as string;

		let record;

		try {
			record = await locals.pb.collection('teams').create({
				title: name,
				description: description,
				trainers: [userId],
				department: departmentId
			});

			await locals.pb.collection('departments').update(departmentId, {
				'teams+': record.id
			});
		} catch (error) {
			console.error(error);
		}

		redirect(303, '/dashboard/teams/' + record.id);
	}
};
