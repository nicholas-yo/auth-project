import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
	const { signIn, signOut, signUp, user, isAuthenticated } =
		useContext(AuthContext);

	return { signIn, signOut, signUp, user, isAuthenticated };
};

export default useAuth;
