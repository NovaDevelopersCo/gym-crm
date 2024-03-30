import { type ReactNode, useEffect } from 'react'

import clsx from 'clsx'

import cl from './Modal.module.scss'

type TModalProps = {
	isOpen: boolean
	setIsOpen: (o: boolean) => void
	children: ReactNode
}

const Modal = ({ isOpen, setIsOpen, children }: TModalProps) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflowY = 'hidden'
		}

		return () => {
			document.body.style.overflowY = 'auto'
		}
	}, [isOpen])

	return (
		<div
			className={clsx(cl.root, isOpen ? cl.root_open : '')}
			onClick={() => setIsOpen(false)}
		>
			<div onClick={e => e.stopPropagation()} className={cl.root__body}>
				{children}
			</div>
		</div>
	)
}

export default Modal
