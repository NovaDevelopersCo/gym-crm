import { createBrowserRouter } from 'react-router-dom'

import { Admin } from '@pages/Admin'
import { Home } from '@pages/Home'
import Layout from '@pages/Layout'
import { Login } from '@pages/Login'

import { ProtectedRoute } from '@shared/ui'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		// errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: (
					<ProtectedRoute allowedRoles={['*']}>
						<Home />
					</ProtectedRoute>
				)
			},
			{
				path: '/admin',
				element: (
					<ProtectedRoute allowedRoles={['admin']}>
						<Admin />
					</ProtectedRoute>
				)
			},
			{
				path: '/login',
				element: <Login />
			}
		]
	}
])
