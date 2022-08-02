import { Button, Input, Typography } from '@material-tailwind/react';
import { FormEvent, useId } from 'react';
import { Helmet as Head } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import { withoutAuth } from '../utils/withoutAuth';

const SignUp = () => {
	const { signUp } = useAuth();

	const nav = useNavigate();

	const formId = useId();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const _target = event.target as HTMLFormElement;

		const user = {
			email: _target.email.value as string,
			name: _target.username.value as string,
			password: _target.password.value as string,
			confirmPassword: _target.confirmPassword.value as string
		};

		try {
			if (user.password !== user.confirmPassword)
				throw new Error('passwords do not match');

			signUp(user);
		} catch (err) {
			const { message } = err as Error;

			alert(message);
		}
	};

	return (
		<>
			<Head>
				<title>Sign Up</title>
			</Head>

			<div className='flex place-content-center h-screen'>
				<form
					className='w-80 m-auto flex flex-col gap-5 border rounded-lg p-5'
					id={formId}
					onSubmit={handleSubmit}>
					<Typography variant='h3' className='self-center'>
						Sign Up
					</Typography>

					<Input required label='Email' type='email' id='email' />
					<Input required label='Name' type='text' id='username' />
					<Input required label='Password' type='password' id='password' />
					<Input
						required
						label='Confirm Password'
						type='password'
						id='confirmPassword'
					/>
					<div className='flex gap-1 place-content-center'>
						<Typography variant='small'>Have an account?</Typography>
						<Typography
							onClick={() => nav('/signin')}
							variant='small'
							color='blue'
							className='underline decoration-solid cursor-pointer'>
							Sign In
						</Typography>
					</div>
					<Button type='submit'>Sign Up</Button>
				</form>
			</div>
		</>
	);
};

export default withoutAuth(SignUp);
