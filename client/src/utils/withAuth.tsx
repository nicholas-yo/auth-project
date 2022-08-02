import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const withAuth = <PageProps extends Record<string, unknown>>(
	Page: FC<PageProps>
) => {
	const Component = ({ ...props }): JSX.Element => {
		const { isAuthenticated } = useAuth();

		if (!isAuthenticated) return <Navigate to='/' replace />;

		return <Page {...(props as PageProps)} />;
	};

	Component.displayName = 'Component';

	return Component;
};
