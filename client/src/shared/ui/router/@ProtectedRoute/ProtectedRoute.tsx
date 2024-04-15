import { Navigate, useLocation } from 'react-router-dom'

import { useAppSelector, useRefreshTokenQuery } from '@store/index'

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
	const { isLoading } = useRefreshTokenQuery()
	const location = useLocation()
	const user = useAppSelector(store => store['auth/slice'].user!)
	const isAuthenticated = useAppSelector(store => store['auth/slice'].isAuth)

	const isAllowed =
		isAuthenticated &&
		(allowedRoles.includes(user.role) || allowedRoles.includes('*'))
	if (isLoading) return <h1>Loading...</h1>
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
