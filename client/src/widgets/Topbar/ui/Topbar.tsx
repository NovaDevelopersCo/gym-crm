import { useAppSelector } from '@/store'
import { User } from 'lucide-react'

import { LogoutBtn } from '@features/Logout'
import { ShowUpdateBtn } from '@features/Updates'

import cl from './Topbar.module.scss'

export const Topbar = () => {
	const user = useAppSelector(state => state['auth/slice'].user!)
	return (
		<header className={cl.root}>
			<h1 className={cl.root__title}>Наставник академия единоборств</h1>
			<div className={cl.root__buttons}>
				<h1 className={cl.root__fio}>
					{user?.email} ({user?.role})
				</h1>
				<ShowUpdateBtn />
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
