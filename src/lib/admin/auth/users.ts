import { prisma } from '$lib/db/prisma';
import type { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

enum ROLE {
	ADMIN,
	USER
}

const SALT_ROUNDS = 12;

function createJWT(user: User) {
	return sign({ id: user.id, email: user.email }, env.JWT_PRIVATE_KEY, {
		expiresIn: '1d'
	});
}

export async function createUser(
	email: string,
	password: string,
	name: string
	// role: ROLE = ROLE.USER
) {
	const salt = await bcrypt.genSalt(SALT_ROUNDS);

	try {
		const user = await prisma.user.create({
			data: {
				email,
				name,
				password: await bcrypt.hash(password, salt)
			}
		});

		const token = createJWT(user);

		return token;
	} catch (error) {
		return error;
	}
}
