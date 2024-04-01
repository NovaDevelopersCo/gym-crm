import { useState } from 'react'

import clsx from 'clsx'
import { ChevronLeft } from 'lucide-react'

import { useAppSelector } from '@store/lib'

import SidebarItem from './@SidebarItem'
import { sidebarItemsArr } from './@SidebarItem/sidebarItems.data'
import cl from './Sidebar.module.scss'

export const Sidebar = () => {
	const user = useAppSelector(state => state['auth/slice'].user!)
	const [isCollapsed, setIsCollapsed] = useState(false)
	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed)
	}

	return (
		<aside className={clsx(cl.root, isCollapsed && cl.root_collapsed)}>
			<header className={cl.root__header}>
				<h2 className={cl.root__header__title}>Наставник CRM</h2>
			</header>
			<main className={cl.root__body}>
				{sidebarItemsArr.map(
					item =>
						item.allowedRoles.includes(user.role) && (
							<SidebarItem
								isCollapsed={isCollapsed}
								key={item.title}
								title={item.title}
								icon={item.icon}
								path={item.path}
							/>
						)
				)}
			</main>
			<footer className={cl.root__footer}>
				<button
					className={cl.root__footer__button}
					type='button'
					onClick={toggleSidebar}
				>
					<ChevronLeft size={32} strokeWidth={3} />
				</button>
			</footer>
		</aside>
	)
}
