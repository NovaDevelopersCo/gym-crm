import { FC, HTMLAttributes } from 'react'

import { authApi } from '@store/api'
import { useAppDispatch } from '@store/lib'

const LogoutBtn: FC<HTMLAttributes<HTMLButtonElement>> = props => {
	const dispatch = useAppDispatch()
	return (
		<button
			{...props}
			onClick={e => {
				if (props.onClick) props.onClick(e)
				dispatch(authApi.endpoints.logoutUser.initiate(''))
			}}
		>
			Logout
		</button>
	)
}

export default LogoutBtn
