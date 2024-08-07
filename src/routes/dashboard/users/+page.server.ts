import { roles } from '$lib/components/dashboard/roles';
import { redirect, type Actions } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (locals.pb.authStore.model.role != 'ADMIN') {
		throw redirect(303, '/dashboard');
	}

	const users = await locals.pb.collection('users').getFullList();

	return { users };
};

export const actions: Actions = {
	updateUser: async ({ request, locals }) => {
		const form = await request.formData();

		const id = form.get('userId');
		const name = form.get('name');
		const username = form.get('username');
		const email = form.get('email');
		const role = form.get('role');

		try {
			const data = {
				name: name,
				username: username,
				email: email,
				role: role
			};
			// console.log(data);
			const updatedRecord = await locals.pb.collection('users').update(id, data);
			return { success: true, updating: true };
		} catch (error) {
			console.log('Error:', error);
		}
	},
	deleteUser: async ({ request, locals }) => {
		const form = await request.formData();
		const id = form.get('userId');

		try {
			// console.log('Löschen');
			await locals.pb.collection('users').delete(id);
			return { success: true };
		} catch (error) {
			return { error: error };
		}
	}
};
