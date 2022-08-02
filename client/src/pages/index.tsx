import { Helmet as Head } from 'react-helmet-async';
import { Navbar, Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const Home = () => {
	const { signOut, isAuthenticated } = useAuth();

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>

			<Navbar className='mx-auto max-w-screen-xl'>
				<div className='text-blue-gray-900 container flex items-center justify-between'>
					<Typography
						as='a'
						href='/'
						variant='small'
						className='mr-4 cursor-pointer py-1.5 font-normal'>
						Auth Project
					</Typography>

					{isAuthenticated ? (
						<div className='flex gap-2 justify-between'>
							<Link to='/profile'>
								<Button variant='gradient' size='sm'>
									Your Profile
								</Button>
							</Link>
							<Button variant='text' size='sm' onClick={() => signOut()}>
								Sign Out
							</Button>
						</div>
					) : (
						<Link to='/signup'>
							<Button variant='gradient' size='sm'>
								Sign Up
							</Button>
						</Link>
					)}
				</div>
			</Navbar>
		</>
	);
};

export default Home;
