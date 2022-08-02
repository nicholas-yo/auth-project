import type { Request, Response } from 'express';
import { JSONSchemaType } from 'ajv';

import { prisma } from '../../../database/prisma';
import { generateToken } from '../../../utils/generateToken';
import { ajv } from '../../../validator/ajv';

type Body = {
	email: string;
	name: string;
	password: string;
	confirmPassword: string;
};

export const schema: JSONSchemaType<Body> = {
	type: 'object',
	properties: {
		confirmPassword: {
			type: 'string'
		},
		email: {
			type: 'string',
			format: 'email'
		},
		name: {
			type: 'string'
		},
		password: {
			type: 'string'
		}
	},
	required: ['confirmPassword', 'email', 'name', 'password']
};

async function handler(req: Request, res: Response) {
	const validate = ajv.compile(schema);

	if (validate(req.body)) {
		const { confirmPassword, password, email, name } = req.body;

		try {
			if (confirmPassword !== password) throw new Error();

			const createdUser = await prisma.user.create({
				data: {
					email,
					name,
					password
				},
				select: {
					id: true,
					email: true,
					name: true
				}
			});

			const token = generateToken({
				email: createdUser?.email,
				name: createdUser?.name
			});

			res.status(201).json({ data: { user: { email, name }, token } });
		} catch (err) {
			res.status(500).json({ error: true });
		}
	}

	res.status(500).json({ error: true });
}

Reflect.set(handler, 'method', 'post');

export default handler;
