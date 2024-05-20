import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { FullPageSpinner } from '@/shared'

import { Sidebar } from '@widgets/Sidebar'
import { Topbar } from '@widgets/Topbar'

import styles from './Layout.module.scss'

const Layout = () => {
	return (
		<div className={styles.layout}>
			<div className={styles.horizontal__wrapper}>
				<Sidebar />
				<div className={styles.vertical__wrapper}>
					<Topbar />
					<main className={styles.outlet__wrapper}>
						<Suspense fallback={<FullPageSpinner />}>
							<Outlet />
						</Suspense>
					</main>
				</div>
			</div>
		</div>
	)
}

export default Layout
