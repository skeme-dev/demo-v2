

// ordentlich JSON validation







import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const users = await locals.pb.collection('users').getFullList({ sort: '-created' });
	const team = await locals.pb.collection('teams').getOne(params.teamId, {
		expand: 'trainers,events,trainings_schedule'
	});
	const events = await locals.pb.collection('events').getList(1, 10, {
		filter: locals.pb.filter('corresponding_teams ~ {:id}', { id: params.teamId })
	});

	// set file object as url
	const fileUrl = locals.pb.getFileUrl(team, team.team_image, {
		thumb: '300x200'
	});

	team.team_image = fileUrl;

	const trainings = await locals.pb.collection('trainings').getList(1, 10, {
		filter: locals.pb.filter('team ?= {:id}', { id: params.teamId })
	});
	return { team, trainings, users, events };
}) satisfies PageServerLoad;

export const actions: Actions = {
	createTrainingSchedule: async ({ request, locals, params }) => {
		const form = await request.formData();

		try {
			const created = await locals.pb.collection('trainings').create(
				{
					day: form.get('day'),
					location_label: form.get('location'),
					location_url: form.get('location_url'),
					start: form.get('time_start'),
					end: form.get('time_end'),
					team: params.teamId
				},
				{
					expand: 'team'
				}
			);

			await locals.pb.collection('teams').update(created.expand.team.id, {
				'training_schedule+': [created.id]
			});

			return { success: true };
		} catch (error) {
			console.error(error);
			return { error: true };
		}
	},
	deleteTrainingSchedule: async ({ request, locals, params }) => {
		const form = await request.formData();

		const id = form.get('trainingScheduleId') as string;

		try {
			await locals.pb.collection('teams').update(params.teamId as string, {
				'training_schedule-': [id]
			});

			await locals.pb.collection('trainings').delete(id);

			return { success: true };
		} catch (error) {
			console.error(error);
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
			await locals.pb.collection('teams').update(params.teamId as string, data);
			return {
				success: true
			};
		} catch (error) {
			return { error: true };
		}
	},
	deleteTrainer: async ({ request, locals, params }) => {
		const form = await request.formData();

		const trainerId = form.get('trainerId');

		try {
			const data = {
				'trainers-': trainerId
			};

			await locals.pb.collection('teams').update(params.teamId as string, data);

			return { success: true };
		} catch (error) {
			return { error: true, msg: error };
		}
	}
};
