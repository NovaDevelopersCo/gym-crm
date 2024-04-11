import { ButtonHTMLAttributes, FC } from 'react'

import { Button as AntdButton } from 'antd'
import { ButtonProps } from 'antd/es/button/button'
import clsx from 'clsx'

import cl from './Button.module.scss'

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps

export const Button: FC<TButtonProps> = ({ children, className, ...props }) => (
	<AntdButton {...props} className={clsx(cl.root, className)}>
		{children}
	</AntdButton>
)
