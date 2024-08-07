import { fail, redirect } from '@sveltejs/kit';

function capitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

// export const prerender = true;
export const load = async ({ params, locals }) => {
	const label = params.sportOffer.toLocaleLowerCase() as string;
	console.log(capitalizeFirstLetter(label));
	const filterString = `label='${capitalizeFirstLetter(label)}'`;
	try {
		const record = await locals.pb
			.collection('departments')
			.getFirstListItem(filterString, { expand: 'leader,teams' });

		return { record };
	} catch (error) {
		console.log(error);
		throw redirect(302, '/');
	}
};
