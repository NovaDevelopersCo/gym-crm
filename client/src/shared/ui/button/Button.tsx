import { FC } from 'react'

import { Button as AntdButton } from 'antd'
import { ButtonProps } from 'antd/es/button/button'
import clsx from 'clsx'

import cl from './Button.module.scss'

type TButtonProps = ButtonProps

const Button: FC<TButtonProps> = ({ children, className, ...props }) => (
	<AntdButton className={clsx(className != undefined && cl.root, className)} {...props}>
		{children}
	</AntdButton>
)

export default Button
