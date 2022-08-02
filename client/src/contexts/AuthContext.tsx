import { createContext } from 'react';
import { User } from '../@types/user';

export type AuthContextType = {
	user: User | null;
	isAuthenticated: boolean;
	signIn: (props: { email: string; password: string }) => Promise<boolean>;
	signOut: () => void;
	signUp: (props: {
		email: string;
		name: string;
		password: string;
		confirmPassword: string;
	}) => Promise<boolean>;
};

export const AuthContext = createContext({} as AuthContextType);
