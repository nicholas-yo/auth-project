import { log } from 'node:console';
import { cyan } from 'cli-color';
import dotenv from 'dotenv';

dotenv.config();

import { app } from './app';
import config from '../api.config';

import './app/middlewares';

const { port } = config;

app.listen(port, () =>
	log(`${cyan('ready')} - running at http://localhost:${port}`)
);
