import React, { useState } from 'react';
import logo from '../Assets/kiwifyLogo.png';
import Spinner from './Spinner';

const ResetPage = () => {
	const [status, setStatus] = useState('');
	const [form, setForm] = useState({});
	const validateEmail = (email) => {
		if (!email) return false;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) return false;
		return true;
	};
	const [formError, setFormError] = useState({
		email: false,
		login: false,
	});

	function delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}
	const validate = async () => {
		// some api call that would either return a truth or false
		let statuss = false;
		setStatus('inProgress');
		await delay(500);
		if (statuss) {
			// Redirect to next page
			setStatus('sent');
		} else {
			setFormError({ ...formError, login: true });
			setStatus('notSent');
			setForm({ email: '' });
		}
	};

	const handleSubmit = () => {
		let testFail = false;
		if (!validateEmail(form.email)) {
			testFail = true;
			setFormError({ ...formError, email: true });
		}
		if (!testFail) {
			setForm({ email: '' });
			validate();
		}
	};

	const handleChange = (e) => {
		setFormError({
			...formError,
			[e.target.id]: false,
			login: false,
		});
		setStatus('');

		setForm({ ...form, [e.target.id]: e.target.value });
	};
	return (
		<>
			<div id='header' className='sm:mx-auto sm:w-full sm:max-w-md'>
				<img className='h-12 w-auto mx-auto' src={logo} alt='Kiwify' />
				<h2 className='mt-6 text-center text-3xl font-extrabold leading-9 text-gray-900'>
					Redefinir a senha
				</h2>
				<p className='mt-2 text-center text-base leading-5 text-gray-600'>
					Você receberá um e-mail com instruções para redefinir a
					senha
				</p>
			</div>
			<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 sm:max-w-md sm:mx-auto sm:w-full'>
				<div>
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium leading-5 mb-1 text-gray-700'
						>
							E-mail
						</label>
						<div>
							<input
								id='email'
								onChange={handleChange}
								type='text'
								autoComplete='off'
								name='null'
								className='form-input block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 w-full'
							/>
						</div>
						<div
							className={`${
								formError.email ? '' : 'hidden'
							} text-red-600 text-sm `}
						>
							Invalid Email
						</div>
					</div>
					<div className='mt-6'>
						<span className='block w-full rounded-md shadow-sm'>
							<button
								onClick={handleSubmit}
								className='w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out relative'
							>
								{status === 'inProgress' ? (
									<Spinner />
								) : (
									'Entrar'
								)}
							</button>
						</span>
					</div>
				</div>
				<div className={`${status === 'sent' ? '' : 'hidden'}`}>
					<h3 className='mt-4 text-center text-xl font-medium text-green-500'>
						E-mail enviado! Verifique a sua caixa de entrada
					</h3>
					<p className='mt-4 text-center'></p>
				</div>
				<div className={`${status === 'notSent' ? '' : 'hidden'}`}>
					<h3 className='mt-4 text-center text-xl font-medium text-red-500'>
						E-mail Not sent! Verifique failed
					</h3>
					<p className='mt-4 text-center'></p>
				</div>
			</div>
		</>
	);
};

export default ResetPage;
