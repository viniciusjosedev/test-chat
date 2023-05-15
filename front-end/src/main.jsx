import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ProviderGeneric from './providers/GenericProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	
  <React.StrictMode>
		<BrowserRouter>
			<ProviderGeneric>
				<App />
			</ProviderGeneric>
		</BrowserRouter>
  </React.StrictMode>,
)
