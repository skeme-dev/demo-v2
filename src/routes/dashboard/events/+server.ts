import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }) => {
	const data = await request.json();

	const eventStart = new Date(`${data.date} ${data.event_start}`);
	const eventEnd = new Date(`${data.date} ${data.event_end}`);

	try {
		await locals.pb.collection('events').create({
			title: data.title,
			description: data.description,
			event_start: eventStart,
			event_end: eventEnd,
			corresponding_teams: [data.id]
		});
		return json({ code: 200, message: 'Ok' });
	} catch (error) {
		console.error(error);
	}
};

export const PUT: RequestHandler = async ({ locals, params }) => {
	return new Response();
};

export const DELETE: RequestHandler = async ({ locals, request }) => {
	const data = await request.json();

	try {
		await locals.pb.collection('events').delete(data.id);
		return json({ code: 200, message: 'Ok' });
	} catch (error) {
		if (error.code == 404) {
			return json({
				status: 404,
				message: "Event couldn't be found"
			});
		}

		return json({ status: 400, message: 'Failed to delete event.' });
	}
};
