import { Link, useLocation } from 'react-router-dom'

import clsx from 'clsx'

import cl from './SidebarItem.module.scss'

export const SidebarItem = ({
	icon,
	title,
	isCollapsed,
	path
}: {
	icon: JSX.Element
	title: string
	isCollapsed?: boolean
	path: string
}) => {
	const location = useLocation()
	const isActive = location.pathname === path

	return (
		<Link
			to={path}
			className={clsx(
				cl.root,
				isCollapsed && cl.root_collapsed,
				isActive && cl.root_active
			)}
		>
			<div className={cl.root__icon}>{icon}</div>
			<p className={cl.root__title}>{title}</p>
		</Link>
	)
}
