import { fail, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
export const POST: RequestHandler = async ({ locals, request, params }) => {
	const data = await request.json();

	try {
		const record = await locals.pb.collection('posts').create(data);
		return json(record);
	} catch (error) {
		return json({
			error: true
		});
	}
};
