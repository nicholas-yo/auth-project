import type { Request, Response } from 'express';
import { compare } from 'bcrypt';
import { JSONSchemaType } from 'ajv';

import { prisma } from '../../../database/prisma';
import { generateToken } from '../../../utils/generateToken';
import { ajv } from '../../../validator/ajv';

type Body = { email: string; password: string };

export const schema: JSONSchemaType<Body> = {
	type: 'object',
	properties: {
		email: {
			type: 'string',
			format: 'email'
		},
		password: {
			type: 'string'
		}
	},
	required: ['email', 'password']
};

async function handler(req: Request, res: Response) {
	const validate = ajv.compile(schema);

	if (validate(req.body)) {
		const { email, password } = req.body;

		try {
			const user = await prisma.user.findUnique({
				where: {
					email
				}
			});

			if (!user) throw new Error();

			if (!(await compare(password, user?.password as string)))
				throw new Error();

			const token = generateToken({ email: user?.email, name: user?.name });

			res.status(200).json({
				data: { user: { email: user?.email, name: user?.name }, token }
			});
		} catch (err) {
			res.status(500).json({ error: true });
		}
	}

	res.status(500).json({ error: true });
}

Reflect.set(handler, 'method', 'post');

export default handler;
