import type { Options } from 'ajv';
import type { Prisma } from '@prisma/client';

export type Config = {
	prisma: Prisma.PrismaClientOptions;
	ajv: Options;
	port: number;
	headers: Record<string, string | number>;
};
