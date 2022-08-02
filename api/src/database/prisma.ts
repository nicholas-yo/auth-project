import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

import config from '../../api.config';

const { prisma: prismaConfig } = config;

export const prisma = new PrismaClient(prismaConfig);

prisma.$use(async (params, next) => {
	const { model, action, args } = params;

	if (model === 'User') {
		if (action === 'create') {
			if (args.data.password) {
				const salt = await genSalt(12);
				const encryptedPassword = await hash(args.data.password, salt);
				args.data.password = encryptedPassword;
			}
		}
	}

	return next(params);
});
