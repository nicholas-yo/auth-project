import { Button, Input, Typography } from '@material-tailwind/react';
import { FormEvent, useId } from 'react';
import { Helmet as Head } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import { withoutAuth } from '../utils/withoutAuth';

const SignIn = () => {
	const { signIn } = useAuth();

	const nav = useNavigate();

	const formId = useId();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const _target = event.target as HTMLFormElement;

		const user = {
			email: _target.email.value as string,
			password: _target.password.value as string
		};

		try {
			signIn(user);
		} catch (err) {
			alert('Não foi possível prosseguir.');
		}
	};

	return (
		<>
			<Head>
				<title>Sign in</title>
			</Head>

			<div className='flex place-content-center h-screen'>
				<form
					className='w-80 m-auto flex flex-col gap-5 border rounded-lg p-5'
					id={formId}
					onSubmit={handleSubmit}>
					<Typography variant='h3' className='self-center'>
						Sign In
					</Typography>

					<Input required label='Email' type='email' id='email' />
					<Input required label='Password' type='password' id='password' />

					<div className='flex gap-1 place-content-center'>
						<Typography variant='small'>Don&apos;t have an account?</Typography>
						<Typography
							onClick={() => nav('/signup')}
							variant='small'
							color='blue'
							className='underline decoration-solid cursor-pointer'>
							Sign up
						</Typography>
					</div>
					<Button type='submit'>Sign In</Button>
				</form>
			</div>
		</>
	);
};

export default withoutAuth(SignIn);
