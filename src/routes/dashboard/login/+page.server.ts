// import { AuthApiError } from '@supabase/supabase-js';
// // import type { PageServerLoad } from './$types';

// import { fail, redirect } from '@sveltejs/kit';

// export const actions = {
// 	login: async ({ request, url, locals: { supabase } }) => {
// 		const formData = await request.formData();
// 		const email = formData.get('email');
// 		const password = formData.get('password');

// 		const { error } = await supabase.auth.signInWithPassword({
// 			email,
// 			password,
// 			options: {
// 				emailRedirectTo: 'http://localhost:5173/dashboard'
// 			}
// 		});

// 		console.log(error);

// 		if (error) {
// 			if (error instanceof AuthApiError && error.status === 400) {
// 				return fail(400, {
// 					error: 'Invalid credentials.',
// 					values: {
// 						email
// 					}
// 				});
// 			}
// 			return fail(500, {
// 				error: 'Server error. Try again later.',
// 				values: {
// 					email
// 				}
// 			});
// 		}

// 		throw redirect(303, '/dashboard');
// 	},
// 	logout: async ({ locals: { supabase } }) => {
// 		await supabase.auth.signOut();
// 		throw redirect(303, '/dashboard/login');
// 	}
// };

import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.pb.authStore.model) {
		throw redirect(303, '/dashboard');
	}
};

export const actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		try {
			await locals.pb.collection('users').authWithPassword(email, password);
			return redirect(303, '/dashboard');
		} catch (error) {
			console.log('Error:', error);
			return {
				error: true,
				email: email
			};
		}
	},
	logout: async ({ locals }) => {
		locals.pb.authStore.clear();
		throw redirect(303, '/dashboard/login');
	}
};
