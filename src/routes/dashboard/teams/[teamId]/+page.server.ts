// ordentlich JSON validation
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const users = await locals.pb.collection('users').getFullList({ sort: '-created' });
	const team = await locals.pb.collection('teams').getOne(params.teamId, {
		expand: 'trainers'
	});

	// set file object as url
	const fileUrl = locals.pb.getFileUrl(team, team.team_image, {
		thumb: '300x200'
	});

	team.team_image = fileUrl;

	const trainings = await locals.pb.collection('trainings').getList(1, 3, {
		filter: locals.pb.filter('team ?= {:id}', { id: params.teamId })
	});
	return { team, trainings, users };
}) satisfies PageServerLoad;

export const actions: Actions = {
	createTrainingSchedule: async ({ request, locals, params }) => {
		const form = await request.formData();

		try {
			const created = await locals.pb.collection('trainings').create({
				day: form.get('day'),
				location_label: form.get('location'),
				location_url: form.get('location_url'),
				start: form.get('time_start'),
				end: form.get('time_end'),
				team: params.teamId
			});

			return { success: true };
		} catch (error) {
			return { error: true };
		}
	},
	addTrainer: async ({ request, locals, params }) => {
		const form = await request.formData();

		const trainerIds: any[] = form.getAll('box');

		try {
			const data = {
				'trainers+': trainerIds
			};
			const record = await locals.pb.collection('teams').update(params.teamId as string, data);
			return {
				success: true
			};
		} catch (error) {
			return { error: true };
		}
	},
	deleteTrainer: async ({ request, locals, params }) => {}
};
