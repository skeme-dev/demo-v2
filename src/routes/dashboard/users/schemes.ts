import { z } from 'zod';

const ROLES = ['DEPARTMENT_LEADER', 'TRAINER', 'ADMIN'];

export const editUserFormSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Der Name muss mindestens zwei Buchstaben haben.' })
		.max(40, { message: 'Der Name darf maximal 40 Buchstaben lang sein.' }),
	username: z
		.string()
		.min(2, { message: 'Der Benutzername muss mindestens zwei Buchstaben haben.' })
		.max(10, { message: 'Der Benutzername darf maximal 10 Buchstaben lang sein.' }),
	role: z.string().refine((v) => ROLES.includes(v), { message: 'Wähle eine Rolle aus.' })
});
