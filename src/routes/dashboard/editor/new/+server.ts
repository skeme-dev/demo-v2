import { json, redirect } from '@sveltejs/kit';
import slugify from 'slugify';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request, params }) => {
	const req = await request.json();

	const data = {
		...req,
		author: locals.pb.authStore.baseModel.id,
		slug: slugify(req.title)
	};

	try {
		const record = await locals.pb.collection('posts').create(data);
		return json({ code: 200, message: 'Ok', data: { id: record.id } });
	} catch (error) {
		return json({
			error: true
		});
	}
};
