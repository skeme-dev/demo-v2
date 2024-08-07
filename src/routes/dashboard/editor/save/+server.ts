import { fail, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import slugify from 'slugify';

export const POST: RequestHandler = async ({ locals, request, params }) => {
	const data = await request.json();

	try {
		await locals.pb.collection('posts').update(data.id, {
			content: data.content,
			title: data.title,
			imageUrl: data.imageUrl,
			slug: slugify(data.title)
		});

		return json({ success: true });
	} catch (error) {
		console.error(error);
		return json({
			error: true
		});
	}
};
