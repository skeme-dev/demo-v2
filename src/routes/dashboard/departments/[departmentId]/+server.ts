import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals, params }) => {
	if (!locals.pb.authStore.model) return error(401, 'Unauthorized');

	const req = await request.json();

	const id = params.departmentId as string;

	try {
		await locals.pb.collection('departments').update(id, req);

		return json({ code: 200, message: 'ok' });
	} catch (error) {
		console.error(error);

		return json({
			error: true
		});
	}
};
