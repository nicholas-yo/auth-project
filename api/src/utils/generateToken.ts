import jwt from 'jsonwebtoken';

export const generateToken = (
	payload: string | object | Buffer,
	options?: jwt.SignOptions
) => jwt.sign(payload, process.env.SECRET as string, options);
