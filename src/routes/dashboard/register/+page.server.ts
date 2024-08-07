// import type { PageServerLoad } from './$types';

import { fail } from '@sveltejs/kit';

export const actions = {
	register: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		console.log(email, password);

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: 'http://localhost:5173/dashboard'
			}
		});

		if (error) {
			return fail(500, {
				message: 'Serverfehler. Versuche es später noch erneut.',
				success: false,
				email
			});
		}

		return {
			message: 'Please check your email for a magic link to log into the website.',
			success: true
		};
	}
};
