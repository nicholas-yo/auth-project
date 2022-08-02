import { ThemeProvider } from '@material-tailwind/react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './provider/AuthProvider';
import './styles/globals.css';
import App from './App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLDivElement
);

root.render(
	<StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<ThemeProvider>
					<HelmetProvider>
						<App />
					</HelmetProvider>
				</ThemeProvider>
			</BrowserRouter>
		</AuthProvider>
	</StrictMode>
);
