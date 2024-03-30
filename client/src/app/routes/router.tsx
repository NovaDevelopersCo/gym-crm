import { createBrowserRouter } from 'react-router-dom'

import { Page404 } from '@pages/404'
import { Admin } from '@pages/Admin'
import { Clients } from '@pages/Clients'
import { Home } from '@pages/Home'
import Layout from '@pages/Layout'
import { Login } from '@pages/Login'
import { Profile } from '@pages/Profile'
import { Registration } from '@pages/Registration'

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
				path: '/profile',
				element: (
					<ProtectedRoute allowedRoles={['*']}>
						<Profile />
					</ProtectedRoute>
				)
			},
			{
				path: '/admin',
				element: (
					<ProtectedRoute allowedRoles={['admin', 'director']}>
						<Admin />
					</ProtectedRoute>
				)
			},
			{
				path: '/clients',
				element: (
					<ProtectedRoute
						allowedRoles={['admin', 'director', 'trainer']}
					>
						<Clients />
					</ProtectedRoute>
				)
			},
			{
				path: '/login',
				element: (
					<ProtectedRoute
						allowedRoles={['*']}
						redirectPath='/'
						isReverse
					>
						<Login />
					</ProtectedRoute>
				)
			},
			{
				path: '/registration',
				element: (
					<ProtectedRoute
						allowedRoles={['*']}
						redirectPath='/'
						isReverse
					>
						<Registration />
					</ProtectedRoute>
				)
			},
			{
				path: '*',
				element: <Page404 />
			}
		]
	}
])
