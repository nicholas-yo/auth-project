import type { Request, Response } from 'express';
import { Router } from 'express';
import { resolve, join } from 'node:path';
import { readdir } from 'node:fs/promises';
import { log } from 'node:console';
import { red } from 'cli-color';

const router = Router();

type Module = {
	default: (
		req: Request,
		res: Response
	) =>
		| Promise<Response<unknown, Record<string, unknown>> | undefined>
		| (Response<unknown, Record<string, unknown>> | undefined)
		| void
		| Promise<void>;
};

const path = resolve(__dirname, './');

/**
 * Reading the directory and then filtering out the index file. Then it's looping through the routes and importing them.
 */
readdir(path)
	.then(routes => routes.filter(route => !route.includes('index')))
	.then(routes => {
		for (const route of routes) {
			import(join(path, route)).then(({ default: handler }: Module) =>
				router[handler.method](
					`/${route.substring(0, route.length - 3)}`,
					handler
				)
			);
		}
	})
	.catch(err => log(`${red('error')} - ${err.message}`));

export default router;
