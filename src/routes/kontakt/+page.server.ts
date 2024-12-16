import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const actions = {
	sendContactForm: async ({ request, locals }) => {
		const formData = await request.formData();
		const company = formData.get('company');
		const salutation = formData.get('salutation');
		const name = formData.get('name');
		const email = formData.get('email');
		const message = formData.get('message');

		const postURL = "http://localhost:8090/api/collections/contact_attempts/records"

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

		try {
			const record = await locals.pb.collection("contact_attempts").create({
				company: company,
				name: name,
				email: email,
				message: message,
				gender: salutation,
				reviewed: false,
			})
		}
		catch (error) {
			console.log("FEHLER", error);
			return fail(400, {
				message: "Anfrage konnte nicht versendet werden."
			})
		}
			return {
				success: true
			};
	}
};
