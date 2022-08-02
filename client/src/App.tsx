import { Route, Routes } from 'react-router-dom';
import Home from './pages';
import NotFound from './pages/404';
import Profile from './pages/profile';
import Signin from './pages/signin';
import Signup from './pages/signup';

const App = () => (
	<Routes>
		<Route index element={<Home />} />
		<Route path='home' element={<Home />} />
		<Route path='profile' element={<Profile />} />
		<Route path='signup' element={<Signup />} />
		<Route path='signin' element={<Signin />} />
		<Route path='*' element={<NotFound />} />
	</Routes>
);

export default App;
