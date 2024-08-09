import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }) => {
	const data = await request.json();

	console.log(data);

	try {
		await locals.pb.collection('posts').update(data.id, { isPublished: data.publish });
		return json({ code: 200, message: 'Ok' });
	} catch (error) {
		return json({
			code: 400,
			message: 'An error occurred.'
		});
	}
};
