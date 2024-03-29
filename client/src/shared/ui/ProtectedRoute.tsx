import { Navigate, useLocation } from 'react-router-dom'

const isAuthenticated = true
const user = {
	role: 'admin'
}

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
