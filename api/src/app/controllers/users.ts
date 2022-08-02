import { Router } from 'express';

import { prisma } from '../../database/prisma';

const router = Router();

router.get('/', async (_req, res) => {
	const users = await prisma.user.findMany();

	res.status(200).json({ data: { users } });
});

export default router;
