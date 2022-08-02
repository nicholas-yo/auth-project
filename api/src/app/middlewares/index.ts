import { red } from 'cli-color';
import { log } from 'node:console';
import { readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const path = resolve(__dirname, './');

readdir(path)
	.then(middlewares =>
		middlewares.filter(middleware => !middleware.includes('index'))
	)
	.then(middlewares => {
		for (const middleware of middlewares) import(join(path, middleware));
	})
	.catch(err => log(`${red('error')} - ${err.message}`));
