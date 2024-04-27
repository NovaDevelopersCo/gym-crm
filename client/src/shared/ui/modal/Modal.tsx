import { Dispatch, PropsWithChildren, SetStateAction, useEffect } from 'react'

import clsx from 'clsx'

import cl from './Modal.module.scss'

type TModalProps = PropsWithChildren<{
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	className?: string
}>

const Modal = ({ isOpen, setIsOpen, children, className }: TModalProps) => {
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
			className={clsx(cl.root, className, isOpen ? cl.root_open : '')}
			onClick={() => setIsOpen(false)}
		>
			<div onClick={e => e.stopPropagation()} className={cl.root__body}>
				{children}
			</div>
		</div>
	)
}

export default Modal
