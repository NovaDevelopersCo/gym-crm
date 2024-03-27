import { Navigate, useLocation } from 'react-router-dom'

const isAuthenticated = true
const user = {
	role: 'user'
}

export const ProtectedRoute = ({
	children,
	allowedRoles
}: {
	children: JSX.Element
	allowedRoles: string[]
}) => {
	const location = useLocation()

	const isAllowed =
		isAuthenticated &&
		(allowedRoles.includes(user.role) || allowedRoles.includes('*'))

	return isAllowed ? (
		children
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	)
}
