import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { authApi, useAppDispatch, useAppSelector } from '@store/index'

const ProtectedRoute = ({
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

	useEffect(() => {
		dispatch(authApi.endpoints.refreshToken.initiate())
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

export default ProtectedRoute
