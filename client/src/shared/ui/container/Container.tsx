import type { ReactNode } from 'react'

import cl from './Container.module.scss'

type TContainerProps = {
	children: ReactNode
}

const Container = ({ children }: TContainerProps) => {
	return <div className={cl.root}>{children}</div>
}

export default Container
