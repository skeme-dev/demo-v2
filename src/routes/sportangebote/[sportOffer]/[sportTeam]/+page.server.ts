import { departmentRoutes, teamStore } from '$lib/stores/routeStore.js';

export const load = async ({ locals, params }) => {
	let team;

	team = await locals.pb.collection('teams').getFirstListItem(
		locals.pb.filter('name ~ {:name}', {
			name: params.sportTeam,
			departement: params.sportOffer
		}),
		{
			expand: 'trainers,training_schedule,relatedPosts'
		}
	);

	return { team };
};
