import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/kiwifyLogo.png';
import Spinner from './Spinner';

const LoginPage = () => {
	const [login, setLogin] = useState('');
	const [form, setForm] = useState({});
	const [formError, setFormError] = useState({
		email: false,
		password: false,
		login: false,
	});
	function delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}
	const loginUser = async () => {
		// some api call that would either return a truth or false
		let status = false;
		setLogin('inProgress');
		await delay(500);
		if (status) {
			// Redirect to next page
			alert('Logged In! Redirecting to next page');
			setLogin('loggedIN');
		} else {
			setFormError({ ...formError, login: true });
			setLogin('fail');
			setForm({ email: '', password: '' });
		}
	};
	const validateEmail = (email) => {
		if (!email) return false;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) return false;
		return true;
	};

	const handleSubmit = () => {
		let testFail = false;
		if (!validateEmail(form.email)) {
			testFail = true;
			setFormError({ ...formError, email: true });
		}
		if (!form.password) {
			testFail = true;
			setFormError({ ...formError, password: true });
		}
		if (!testFail) {
			setForm({ email: '', password: '' });
			loginUser();
		}
	};

	const handleChange = (e) => {
		setFormError({
			...formError,
			[e.target.id]: false,
			login: false,
		});

		setLogin('');
		if (!validateEmail(form.email)) {
			setFormError({ ...formError, email: true });
		}

		setForm({ ...form, [e.target.id]: e.target.value });
	};

	return (
		<>
			<div id='header' className='sm:mx-auto sm:w-full sm:max-w-md'>
				<img className='h-12 w-auto mx-auto' src={logo} alt='Kiwify' />
				<h2 className='mt-6 text-center text-3xl font-extrabold leading-9 text-gray-900'>
					Criar nova conta
				</h2>
				<p className='mt-2 text-center text-base leading-5 text-gray-600'>
					Ou
					<Link
						to='/signup'
						className='font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:underline focus:outline-none ml-1'
						relative='path'
					>
						entrar na sua conta existente
					</Link>
				</p>
			</div>
			<div id='form' className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<div>
						<label className='block text-sm font-medium leading-5 mb-1 text-gray-700'>
							E-mail
						</label>
						<div>
							<input
								value={form.email}
								id='email'
								type='text'
								autoComplete='off'
								name='null'
								onChange={handleChange}
								className={`form-input block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none ${
									formError.email
										? 'focus:shadow-outline-red focus:border-red-300'
										: 'focus:shadow-outline-blue focus:border-blue-300'
								}  transition duration-150 ease-in-out sm:text-sm sm:leading-5 w-full`}
							/>
						</div>
						<div
							className={`${
								formError.email ? '' : 'hidden'
							} text-red-600 text-sm`}
						>
							Invalid Email
						</div>
					</div>
					<div className='mt-6'>
						<label className='block text-sm font-medium leading-5 text-gray-700'>
							Senha
						</label>
						<div>
							<input
								value={form.password}
								id='password'
								type='password'
								autoComplete='off'
								name='null'
								onChange={handleChange}
								className={`form-input focus:shadow-outline-blue block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm transition duration-150 ease-in-out ${
									formError.password
										? 'focus:shadow-outline-red focus:border-red-300'
										: 'focus:shadow-outline-blue focus:border-blue-300'
								} sm:text-sm sm:leading-5`}
							/>
						</div>
						<div
							className={`${
								formError.password ? '' : 'hidden'
							} text-red-600 text-sm `}
						>
							Invalid Password
						</div>
					</div>
					<div className='mt-2 flex items-center justify-end'>
						<div className='text-sm leading-5'>
							<Link
								to='/reset'
								className='font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150'
								path='relative'
							>
								Esqueceu a senha?
							</Link>
						</div>
					</div>
					<div
						className={`${
							login === 'fail' ? '' : 'hidden'
						} mt-4 bg-red-50 border-l-4 border-red-400 p-4 mb-8`}
					>
						<div className='flex items-center'>
							<div className='flex-shrink-0'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									width='24px'
									height='24px'
									className='text-red-400'
								>
									<path
										fill-rule='evenodd'
										d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
										clip-rule='evenodd'
									></path>
								</svg>
							</div>{' '}
							<div className='ml-3'>
								<p className='text-sm leading-5 text-red-700'>
									N??o existe um usu??rio com esse e-mail
								</p>
							</div>
						</div>
					</div>
					<div className='mt-6'>
						<span className='block w-full rounded-md shadow-sm'>
							<button
								onClick={handleSubmit}
								className='focus:shadow-outline-indigo flex w-full justify-center  items-center rounded-md border border-transparent bg-indigo-600 h-8 px-4 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-indigo-500 focus:border-indigo-700 focus:outline-none active:bg-indigo-700'
							>
								{login === 'inProgress' ? <Spinner /> : ''}
								Entrar
							</button>
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
