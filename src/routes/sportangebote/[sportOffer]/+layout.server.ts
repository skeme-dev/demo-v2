import { teamStore } from '$lib/stores/routeStore.js';
import { fail, redirect } from '@sveltejs/kit';

function capitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

// export const prerender = true;
export const load = async ({ params, locals }) => {
	// const label = params.sportOffer.toLocaleLowerCase() as string;
	// const filterString = `label='${capitalizeFirstLetter(label)}'`;
	// try {
	// 	const record = await locals.pb.collection('departments').getFirstListItem(filterString, {
	// 		expand: 'teams,relatedPosts',
	// 		fields: 'id,expand.teams.id,expand.teams.title'
	// 	});
	// 	console.log('Hello from department sites');
	// 	return { record };
	// } catch (error) {
	// 	console.log(error);
	// 	throw redirect(302, '/');
	// }
};
