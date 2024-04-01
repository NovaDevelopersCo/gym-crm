import { BarChart3, CloudCog, Home, Users } from 'lucide-react'

import { EUserRoles } from '@store/index'

type TAllRoles = EUserRoles.ADMIN | EUserRoles.DIRECTOR | EUserRoles.TRAINER

const allRoles: TAllRoles[] = [
	EUserRoles.DIRECTOR,
	EUserRoles.ADMIN,
	EUserRoles.TRAINER
]

export const sidebarItemsArr: {
	title: string
	path: string
	icon: JSX.Element
	allowedRoles: TAllRoles[]
}[] = [
	{
		title: 'Главная',
		path: '/',
		icon: <Home />,
		allowedRoles: allRoles
	},
	{
		title: 'Клиенты',
		path: '/clients',
		icon: <Users />,
		allowedRoles: allRoles
	},
	{
		title: 'Аналитика',
		path: '/dashboard',
		icon: <BarChart3 />,
		allowedRoles: [EUserRoles.DIRECTOR]
	},
	{
		title: 'Персонал',
		path: '/stuff',
		icon: <CloudCog />,
		allowedRoles: [EUserRoles.DIRECTOR]
	}
]
