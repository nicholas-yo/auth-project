import type { Request, Response } from 'express';
import { JSONSchemaType } from 'ajv';

import { ajv } from '../../../validator/ajv';
import { verifyToken } from '../../../utils/verifyToken';

type Body = {
	token: string;
};

export const schema: JSONSchemaType<Body> = {
	type: 'object',
	properties: {
		token: {
			type: 'string'
		}
	},
	required: ['token']
};

function handler(req: Request, res: Response) {
	const validate = ajv.compile(schema);

	if (validate(req.body)) {
		const { token } = req.body;

		try {
			const decoded = verifyToken(token) as {
				email: string;
				name: string;
				iat: number;
			};

			const { email, name } = decoded;

			res.status(200).json({
				data: {
					user: {
						email,
						name
					}
				}
			});
		} catch (err) {
			res.status(500).json({ error: true });
		}
	}

	res.status(500).json({ error: true });
}

Reflect.set(handler, 'method', 'post');

export default handler;
