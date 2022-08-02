import type { Router } from 'express';
import { log } from 'node:console';
import { red } from 'cli-color';
import { readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import { app } from '..';

type Module = {
	default: Router;
};

const path: string = resolve(__dirname, '../controllers');

readdir(path)
	.then(controllers =>
		controllers.filter(controller => !controller.startsWith('index'))
	)
	.then(controllers => {
		for (const controller of controllers) {
			import(join(path, controller)).then(({ default: router }: Module) => {
				const controllerPath = /.ts$/.exec(controller)
					? controller.substring(0, controller.length - 3)
					: controller;

				app.use(`/${controllerPath}`, router);
			});
		}
	})
	.catch(err => log(`${red('error')} - ${err.message}`));
