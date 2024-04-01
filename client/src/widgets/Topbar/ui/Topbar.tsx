// import { Bell, File, FolderClosed,  } from 'lucide-react'
import { User } from 'lucide-react'

import { useAppSelector } from '@store/index'

import { LogoutBtn } from '@features/Auth'

import cl from './Topbar.module.scss'

// import { topbarCounts } from './topbarCounts.data'

export const Topbar = () => {
	const user = useAppSelector(state => state['auth/slice'].user!)
	return (
		<header className={cl.root}>
			<h1>Наставник академия единоборств</h1>
			<div className={cl.root__buttons}>
				{/* <button className={cl.root__buttons__invoice}>
					<File size={18} />
					Счета
					<span className={cl.root__buttons__invoice__count}>
						({topbarCounts.invoiceCount})
					</span>
				</button> */}
				{/* <button className={cl.root__buttons__folder}>
					{topbarCounts.folderCount > 0 && (
						<span>{topbarCounts.folderCount}</span>
					)}
					<FolderClosed size={15} />
				</button> */}
				{/* <button className={cl.root__buttons__notifications}>
					{topbarCounts.notificationCount > 0 && (
						<span>{topbarCounts.notificationCount}</span>
					)}
					<Bell size={15} />
				</button> */}
				{/*  */}
				<h1>
					{user?.name} ({user?.role})
				</h1>
				<button className={cl.root__buttons__profile}>
					<div className={cl.root__buttons__profile__bg}></div>
					<div>
						<User color='#10ceb0' size={18} />
					</div>
				</button>
				<LogoutBtn />
			</div>
		</header>
	)
}
