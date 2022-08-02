import { ReactNode, useEffect, useState } from 'react';
import { User } from '../@types/user';
import { AuthContext } from '../contexts/AuthContext';

type Props = {
	children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<User | null>(null);

	const isAuthenticated = !!user;

	useEffect(() => {
		const token = localStorage.getItem('auth-token');

		if (token) {
			fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/validateToken`, {
				body: JSON.stringify({ token }),
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=UTF-8'
				}
			})
				.then(res => res.json())
				.then(({ data }) => {
					if (data.user) setUser(data.user);
				});
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				async signIn({ email, password }): Promise<boolean> {
					const res = await fetch(
						`${import.meta.env.VITE_API_BASE_URL}/auth/signIn`,
						{
							method: 'POST',
							body: JSON.stringify({ email, password }),
							headers: {
								'Content-Type': 'application/json; charset=UTF-8'
							}
						}
					);

					const { data } = await res.json();

					if (data.user && data.token) {
						setUser(data.user);
						localStorage.setItem('auth-token', data.token);
						window.location.replace('/');
						return true;
					}

					return false;
				},
				signOut(): void {
					setUser(null);
					localStorage.removeItem('auth-token');
				},
				async signUp({
					confirmPassword,
					email,
					name,
					password
				}): Promise<boolean> {
					const res = await fetch(
						`${import.meta.env.VITE_API_BASE_URL}/auth/signUp`,
						{
							method: 'POST',
							body: JSON.stringify({ confirmPassword, email, name, password }),
							headers: {
								'Content-Type': 'application/json; charset=UTF-8'
							}
						}
					);

					const { data } = await res.json();

					if (data.user && data.token) {
						setUser(data.user);
						localStorage.setItem('auth-token', data.token);
						window.location.replace('/');
						return true;
					}

					return false;
				},
				isAuthenticated
			}}>
			{children}
		</AuthContext.Provider>
	);
};
