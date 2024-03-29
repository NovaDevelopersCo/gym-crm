import { authApi, useAppDispatch, useAppSelector, useRefreshTokenQuery } from '@store/index'
import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export const ProtectedRoute = ({
	children,
	allowedRoles,
	redirectPath = '/login',
	isReverse = false
}: {
	children: JSX.Element
	allowedRoles: string[]
	redirectPath?: string
	isReverse?: boolean
}) => {
	const location = useLocation()
	const dispatch = useAppDispatch()
	const user = useAppSelector(store => store['auth/slice'].user)
	const isAuthenticated = useAppSelector(store => store['auth/slice'].isAuth)
	// const { data, refetch } = useRefreshTokenQuery()
	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(authApi.endpoints.refreshToken.initiate())
		}
	}, [])

	const isAllowed =
		isAuthenticated &&
		(allowedRoles.includes(user.role) || allowedRoles.includes('*'))

	if (isReverse) {
		return isAllowed ? (
			<Navigate to={redirectPath} state={{ from: location }} replace />
		) : (
			children
		)
	} else {
		return isAllowed ? (
			children
		) : (
			<Navigate to={redirectPath} state={{ from: location }} replace />
		)
	}
}
