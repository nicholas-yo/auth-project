import { Helmet as Head } from 'react-helmet-async';

import useAuth from '../hooks/useAuth';
import { withAuth } from '../utils/withAuth';

const Profile = () => {
	const { user } = useAuth();

	return (
		<>
			<Head>
				<title>Profile</title>
			</Head>

			<pre className='p-3'>{JSON.stringify(user, null, '\t')}</pre>
		</>
	);
};

export default withAuth(Profile);
