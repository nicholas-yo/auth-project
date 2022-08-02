import { app } from '..';

import config from '../../../api.config';

const { headers } = config;

if (Object.keys(headers).length > 0)
	app.use((_req, res, next) => {
		for (const [key, value] of Object.entries(headers))
			res.setHeader(key, value);

		next();
	});
