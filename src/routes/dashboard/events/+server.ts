import DataTableActions from '$lib/components/dashboard/components/DataTable/data-table-actions.svelte';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request, params }) => {
	const data = await request.json();

	const d1 = new Date(`${data.date} ${data.event_start}`);
	const d2 = new Date(`${data.date} ${data.event_end}`);

	try {
		await locals.pb.collection('events').create({
			title: data.title,
			description: data.description,
			event_start: d1.toUTCString(),
			event_end: d2.toUTCString(),
			teams: [data.id]
		});
	} catch (error) {
		console.error(error);
	}

	return json(data);
};

export const PUT: RequestHandler = async ({ locals, params }) => {
	return new Response();
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	return new Response();
};
