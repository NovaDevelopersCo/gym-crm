import { useState } from 'react'

import clsx from 'clsx'
import { ChevronLeft } from 'lucide-react'

import cl from './Sidebar.module.scss'
import { SidebarItem } from './SidebarItem'
import { sidebarItemsArr } from './sidebarItems.data'

export const Sidebar = () => {
	const [isCollapsed, setIsCollapsed] = useState(false)
	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed)
	}

	return (
		<div className={clsx(cl.root, isCollapsed && cl.root_collapsed)}>
			<div className={cl.root__header}>
				<h2 className={cl.root__header__title}>Sidebar</h2>
			</div>
			<div className={cl.root__body}>
				{sidebarItemsArr.map(item => (
					<SidebarItem
						isCollapsed={isCollapsed}
						key={item.title}
						title={item.title}
						icon={item.icon}
						path={item.path}
					/>
				))}
			</div>
			<div className={cl.root__footer}>
				<button
					className={cl.root__footer__button}
					type='button'
					onClick={toggleSidebar}
				>
					<ChevronLeft size={32} strokeWidth={3} />
				</button>
			</div>
		</div>
	)
}
