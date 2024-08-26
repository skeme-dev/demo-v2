import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }) => {
	const data = await request.json();

	try {
		await locals.pb.collection('posts').delete(data.id);
		return json({ code: 200, message: 'Ok' });
	} catch (error) {
		console.error(error);

		if (error.code == 404) {
			return json({
				status: 404,
				message: "Post couldn't be found "
			});
		}

		return json({ status: 400, message: 'Failed to delete post.' });
	}
};
