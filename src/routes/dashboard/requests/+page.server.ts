import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load = (async ({locals}) => {
	if (locals.pb.authStore.model.role != 'ADMIN') {
		throw redirect(303, '/dashboard');
	}

	const requests = await locals.pb.collection("contact_attempts").getFullList();
	return {
		requests
	};
}) satisfies PageServerLoad;

export const actions = {
	markAsReviewed: async ({request, locals}) => {
		const form = await request.formData();

		const id = form.get('requestId') as string;
		const reviewed = form.get("reviewed");

		try {
			await locals.pb.collection("contact_attempts").update(id, { reviewed: reviewed });
			return {success: true};
		} catch (e) {
			console.error(e);
			return fail(400);
		}
	},

	deleteRequest: async ({request, locals}) => {
		const form = await request.formData();
		const id = form.get('requestId') as string;

		try {
			await locals.pb.collection("contact_attempts").delete(id);
			return {success: true};
		}
		catch (e) {
			console.error(e);
			return fail(400);
		}
	}
}