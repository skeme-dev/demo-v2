import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	let correspondingDepartment;

	const users = await locals.pb.collection('users').getFullList();

	if (locals.pb.authStore.baseModel.role == 'DEPARTMENT_LEADER') {
		correspondingDepartment = await locals.pb
			.collection('departments')
			.getFirstListItem(
				locals.pb.filter('leader = {:id}', { id: locals.pb.authStore.baseModel.id })
			);

		throw redirect(303, '/dashboard/departments/' + correspondingDepartment.items[0].id);
	}

	const departments = await locals.pb.collection('departments').getFullList();

	return { departments, users };
}) satisfies PageServerLoad;

export const actions = {
	createTeam: async ({ request, locals }) => {
		const formData = await request.formData();

		const title = formData.get('title');
		const description = formData.get('description');
		const userId = formData.get('userId');
		const training_schedule = {};
		const team_image = formData.get('team_image');

		const data = {
			title: title,
			description: description,
			trainers: [userId],
			training_schedule: training_schedule,
			team_image: team_image
		};

		const record = await locals.pb.collection('teams').create(data);
	},
	updateTeam: async ({ request, locals }) => {
		const formData = await request.formData();
	},
	deleteTeam: async ({ request, locals }) => {
		const formData = await request.formData();
	}
};
