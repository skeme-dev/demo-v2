// // src/hooks.server.js
// import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
// import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';

// export const handle = async ({ event, resolve }) => {
// 	// event.locals.supabase = createSupabaseServerClient({
// 	// 	supabaseUrl: PUBLIC_SUPABASE_URL,
// 	// 	supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
// 	// 	event
// 	// });

// 	// /**
// 	//  * a little helper that is written for convenience so that instead
// 	//  * of calling `const { data: { session } } = await supabase.auth.getSession()`
// 	//  * you just call this `await getSession()`
// 	//  */
// 	// event.locals.getSession = async () => {
// 	// 	const {
// 	// 		data: { session }
// 	// 	} = await event.locals.supabase.auth.getSession();
// 	// 	return session;
// 	// };
// 	// return resolve(event, {
// 	// 	filterSerializedResponseHeaders(name) {
// 	// 		return name === 'content-range';
// 	// 	}
// 	// });
// };
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_URL);

	// load the store data from the request cookie string
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		event.locals.pb.authStore.isValid && (await event.locals.pb.collection('users').authRefresh());
	} catch (_) {
		// clear the auth store on failed refresh
		event.locals.pb.authStore.clear();
	}

	const response = await resolve(event);

	// send back the default 'pb_auth' cookie to the client with the latest store state
	response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

	return response;
};
