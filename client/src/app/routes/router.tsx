/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react'
import { Outlet, createBrowserRouter } from 'react-router-dom'

import Layout from '@pages/Layout'

import { ProtectedRoute } from '@shared/ui'

const Login = lazy(() => import('@pages/Login'))

const Page404 = lazy(() => import('@pages/404'))
const ClientsPage = lazy(() => import('@pages/Clients'))
const ClientProfile = lazy(() => import('@pages/ClientProfile'))
const Dashboard = lazy(() => import('@pages/Dashboard'))
const Home = lazy(() => import('@pages/Home'))
const Stuff = lazy(() => import('@pages/Stuff'))

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
				path: '/login',
				element: (
					<ProtectedRoute
						allowedRoles={['*']}
						redirectPath='/'
						isReverse
					>
						<Suspense fallback={<h1>Loading...</h1>}>
							<Login />
						</Suspense>
					</ProtectedRoute>
				)
			}
		]
	}
])
