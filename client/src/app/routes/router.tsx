import { Outlet, createBrowserRouter } from 'react-router-dom'

import { Page404 } from '@pages/404'
import { Admin } from '@pages/Admin'
import { Home } from '@pages/Home'
import Layout from '@pages/Layout'
import { Login } from '@pages/Login'
import { Profile } from '@pages/Profile'
import { Registration } from '@pages/Registration'

import { ProtectedRoute } from '@shared/ui'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Outlet />,
		// errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <ProtectedRoute allowedRoles={['*']}><Layout /></ProtectedRoute>,
				children: [
					{
						index: true,
						element: (
							<ProtectedRoute allowedRoles={['*']}>
								<Home />
							</ProtectedRoute>
						),
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
						path: '*',
						element: <Page404 />
					}
				]
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
			}
		]
	}
])
