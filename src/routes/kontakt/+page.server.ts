import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const actions = {
	sendContactForm: async ({ request }) => {
		const formData = await request.formData();
		const salutation = formData.get('salutation');
		const name = formData.get('name');
		const email = formData.get('email');
		const message = formData.get('message');

		const missingValues = [];

		if (name === '') {
			missingValues.push('name');
		}
		if (email === '') {
			missingValues.push('email');
		}
		if (message === '') {
			missingValues.push('message');
		}

		if (missingValues.length !== 0) {
			return fail(400, {
				message: 'Bitte füllen Sie alle Pflichtfelder aus.',
				data: missingValues
			});
		}
		return {
			success: true
		};
	}
};
