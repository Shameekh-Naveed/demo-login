import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/kiwifyLogo.png';
import Spinner from './Spinner';

const SignupPage = () => {
	const [login, setLogin] = useState('');
	const [checkbox, setCheckbox] = useState(false);
	const [form, setForm] = useState({});
	const [formError, setFormError] = useState({
		email: false,
		repeatEmail: false,
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
		if (!validateEmail(form.repeatEmail)) {
			testFail = true;
			setFormError({ ...formError, repeatEmail: true });
		}
		if (form.repeatEmail !== form.email) {
			testFail = true;
			setFormError({ ...formError, repeatEmail: true });
		}
		if (!form.password) {
			testFail = true;
			setFormError({ ...formError, password: true });
		}
		if (!checkbox) {
			testFail = true;
			setFormError({ ...formError, checkbox: true });
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
		if (!validateEmail(form.email)) {
			setFormError({ ...formError, email: true });
		}
		setLogin('');

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
						to='/login'
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
						<label className='mb-1 block text-sm font-medium leading-5 text-gray-700'>
							Repetir e-mail
						</label>
						<div>
							<input
								value={form.repeatEmail}
								id='repeatEmail'
								type='text'
								autoComplete='off'
								name='null'
								onChange={handleChange}
								className={`form-input block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none ${
									formError.repeatEmail
										? 'focus:shadow-outline-red focus:border-red-300'
										: 'focus:shadow-outline-blue focus:border-blue-300'
								}  transition duration-150 ease-in-out sm:text-sm sm:leading-5 w-full`}
							/>
						</div>
						<div
							className={`${
								formError.repeatEmail ? '' : 'hidden'
							} text-red-600 text-sm`}
						>
							Emails do not match
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
					<div className='mt-6'>
						<label className='relative mt-2 flex items-start'>
							<div className='flex h-5 items-center'>
								<input
									onChange={() => setCheckbox(!checkbox)}
									type='checkbox'
									className='form-checkbox h-4 w-4 cursor-pointer text-indigo-600 transition duration-150 ease-in-out'
								/>
							</div>
							<div className='ml-2 text-sm leading-5'>
								<span className='font-medium text-gray-700'>
									Eu li e aceito os
									<a
										href='https://kiwify.com.br/termos-de-uso'
										target='_blank'
										className='underline'
									>
										termos de uso
									</a>
									,
									<a
										href='https://kiwify.com.br/licenca-de-uso-software'
										target='_blank'
										className='underline'
									>
										termos de licença de uso de software
									</a>
									,
									<a
										href='https://kiwify.com.br/politica-de-conteudo'
										target='_blank'
										className='underline'
									>
										política de conteúdo
									</a>
									da Kiwify
								</span>
							</div>
						</label>
					</div>
					<div className='mt-6'>
						<span className='block w-full rounded-md shadow-sm'>
							<button
								onClick={handleSubmit}
								className='focus:shadow-outline-indigo flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-indigo-500 focus:border-indigo-700 focus:outline-none active:bg-indigo-700 relative'
							>
								{login === 'inProgress' ? (
									<Spinner />
								) : (
									'Entrar'
								)}
							</button>
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignupPage;
