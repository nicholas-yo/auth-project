import { Config } from './src/@types/api.config';

const securityHeaders = {
	'Cache-Control': 'no-store',
	'Content-Security-Policy': `frame-ancestors 'none'`,
	'Content-Type': 'application/json',
	'X-Content-Type-Options': 'nosniff',
	'X-Frame-Options': 'DENY'
};

const corsHeaders = {
	'Access-Control-Allow-Origin': process.env.CLIENT_BASE_URL as string,
	'Access-Control-Allow-Methods': 'POST',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Max-Age': 86400
};

const headers = { ...securityHeaders, ...corsHeaders };

const apiConfig: Config = {
	port: 3000,
	ajv: {
		strict: true,
		strictSchema: true
	},
	prisma: {
		errorFormat: 'pretty'
	},
	headers
};

export default apiConfig;
