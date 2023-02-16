import { Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import ResetPage from './Components/ResetPage';
import './App.css';

function App() {
	return (
		<div id='layout'>
			<div className='flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8'>
				<Routes>
					<Route path='/' element={<LoginPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/signup' element={<SignupPage />} />
					<Route path='/reset' element={<ResetPage />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
