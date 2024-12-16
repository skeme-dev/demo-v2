import { departmentRoutes, teamStore } from '$lib/stores/routeStore.js';

export const load = async ({ locals, params }) => {
	let team;

	teamStore.subscribe(async (v) => {
		if (v) {
			console.log(v);
		}
	});
	team = await locals.pb.collection('teams').getFirstListItem(
		locals.pb.filter('title ~ {:title}', {
			title: params.sportTeam,
			departement: params.sportOffer
		}),
		{
			expand: 'trainers,training_schedule,relatedPosts'
		}
	);

	console.log(team)

	return { team };
};
