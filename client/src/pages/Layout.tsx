import { Outlet } from 'react-router-dom'
import { Sidebar } from '@widgets/Sidebar';
import styles from './Layout.module.scss'

const Layout = () => {
	return <div className={styles.layout}>
		<div className={styles.horizontal__wrapper}>
			<Sidebar />
			<main className={styles.outlet__wrapper}>
				<Outlet />
			</main>
		</div>
	</div>
}

export default Layout
