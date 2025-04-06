import { teamStore } from '$lib/stores/routeStore.js';
import { fail, redirect } from '@sveltejs/kit';
import slugify from 'slugify';

function capitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

// export const prerender = true;
export const load = async ({ params, locals }) => {
	const label = decodeURIComponent(params.sportOffer.toLocaleLowerCase()) as string;
	const filterString = `slug='${slugify(label, { lower: true })}'`;

	try {
		const record = await locals.pb.collection('departments').getFirstListItem(filterString, {
			expand: 'leader,teams,relatedPosts',
			fields:
				'label,description,expand.relatedPosts.title,expand.relatedPosts.isPublished,expand.relatedPosts.created,expand.relatedPosts.updated,expand.relatedPosts.publishDate,expand.relatedPosts.slug,expand.leader.name,expand.leader.email,expand.leader.phoneNumber,expand.leader.role,expand.teams.id,expand.teams.name,expand.teams.team_image'
		});

		teamStore.set(record.items);
		return { record };
	} catch (error) {
		console.log(error);
		throw redirect(302, '/');
	}
};
