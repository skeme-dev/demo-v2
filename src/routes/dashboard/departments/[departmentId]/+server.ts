import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals, params }) => {
	const req = await request.json();

	const id = params.departmentId as string;
	const label = req.label as string;
	const description = req.description as string;

	console.log(label, description);

	let data = {
		description: description
	};

	try {
		await locals.pb.collection('departments').update(id, data);
		// console.log(data);

		return json({ code: 200, message: 'ok' });
	} catch (error) {
		console.error(error);

		return json({
			error: true
		});
	}
};
