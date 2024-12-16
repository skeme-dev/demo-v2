import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({locals}) => {
	console.log(locals.pb.authStore.model.role);

	if (locals.pb.authStore.model.role == 'TRAINER') {
		const team = await locals.pb.collection("teams").getFirstListItem(`trainers ~ "${locals.pb.authStore.model.id}"`);
		throw redirect(303, '/dashboard/teams/'+team.id);
	}

	throw redirect(303, '/dashboard/teams');

	return {};
}) satisfies PageServerLoad;

export const actions = {
	updateTeam: async ({ request, locals }) => {
		const formData = await request.formData();
	},
	deleteTeam: async ({ request, locals }) => {
		const formData = await request.formData();
		const teamId = formData.get('teamId') as string;

		try {
			await locals.pb.collection('teams').delete(teamId);
			return { success: true };
		} catch (error) {
			console.error(error);
			return {
				error: true,
				message: error
			};
		}
	}
};
