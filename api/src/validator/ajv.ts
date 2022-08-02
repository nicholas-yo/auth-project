import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import config from '../../api.config';

const { ajv: ajvConfig } = config;

const ajv = new Ajv(ajvConfig);

addFormats(ajv);

export { ajv };
