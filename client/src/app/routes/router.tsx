import { Outlet, createBrowserRouter } from 'react-router-dom'

import { Page404 } from '@pages/404'
import { ClientProfile, ClientsPage } from '@pages/Clients'
import { Dashboard } from '@pages/Dashboard'
import { Home } from '@pages/Home'
import Layout from '@pages/Layout'
import { Login } from '@pages/Login'
import { Stuff } from '@pages/Stuff'

import { ProtectedRoute } from '@shared/ui'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Outlet />,
		// errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: (
					<ProtectedRoute allowedRoles={['*']}>
						<Layout />
					</ProtectedRoute>
				),
				children: [
					{
						index: true,
						element: (
							<ProtectedRoute allowedRoles={['*']}>
								<Home />
							</ProtectedRoute>
						)
					},
					{
						path: '/clients',
						element: (
							<ProtectedRoute allowedRoles={['*']}>
								<ClientsPage />
							</ProtectedRoute>
						)
					},
					{
						path: '/clients/:clientId',
						element: (
							<ProtectedRoute allowedRoles={['*']}>
								<ClientProfile />
							</ProtectedRoute>
						)
					},
					{
						path: '/dashboard',
						element: (
							<ProtectedRoute allowedRoles={['director']}>
								<Dashboard />
							</ProtectedRoute>
						)
					},
					{
						path: '/stuff',
						element: (
							<ProtectedRoute allowedRoles={['director']}>
								<Stuff />
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
				path: '/clients',
				element: (
					<ProtectedRoute
						allowedRoles={['admin', 'director', 'trainer']}
					>
						<ClientsPage />
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
			}
		]
	}
])
