import { createBrowserRouter } from 'react-router-dom'

import { Home } from '@pages/Home'
import Layout from '@pages/Layout'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		// errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Home />
			}
		]
	}
])
