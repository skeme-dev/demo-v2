import { departmentRoutes } from '$lib/stores/routeStore';

import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export const load = async ({ fetch }) => {
	const req = await fetch(
		`${PUBLIC_POCKETBASE_URL}/api/collections/departments/records?fields=label`
	);

	const departments = await req.json();

	departmentRoutes.set(departments);

	return { departments };
};
