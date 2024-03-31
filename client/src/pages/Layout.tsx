import { Outlet } from 'react-router-dom'
import { Sidebar } from '@widgets/Sidebar';
import styles from './Layout.module.scss'
import { Topbar } from '@widgets/Topbar';

const Layout = () => {
	return <div className={styles.layout}>
		<div className={styles.horizontal__wrapper}>
			<Sidebar />
			<div className={styles.vertical__wrapper}>
				<Topbar />
				<main className={styles.outlet__wrapper}>
					<Outlet />
				</main>
			</div>
		</div>
	</div>
}

export default Layout
