import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }) => {
	const data = await request.json();

	try {
		await locals.pb.collection('departments').create(data);
	} catch (error) {
		console.error(error);
	}

	return json({ code: 200 });
};
