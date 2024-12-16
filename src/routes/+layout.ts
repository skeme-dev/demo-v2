import { departmentRoutes } from '$lib/stores/routeStore';
import type { LayoutLoad } from './dashboard/$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const req = await fetch('http://localhost:8090/api/collections/departments/records?fields=label');

	const departments = await req.json();

	departmentRoutes.set(departments);

	return { departments };
};
