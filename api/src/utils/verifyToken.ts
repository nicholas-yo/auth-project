import jwt from 'jsonwebtoken';

type Options = jwt.VerifyOptions & {
	complete?: false | undefined;
};

export const verifyToken = (token: string, options?: Options) =>
	jwt.verify(token, process.env.SECRET as string, options);
