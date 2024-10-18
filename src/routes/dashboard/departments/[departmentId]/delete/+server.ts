import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, params }) => {
	const id = params.departmentId as string;

	try {
		await locals.pb.collection('departments').delete(id);
		return json({ ok: true, redirectUrl: '/dashboard/departments' });
	} catch (error) {
		console.log('Fehler beim Löschen');
		return json({ error: error });
	}
};
