import { BarChart3, CloudCog, Home, Users } from 'lucide-react'

import { EStuffRoles } from '@store/index'

type TAllRoles = EStuffRoles.ADMIN | EStuffRoles.DIRECTOR | EStuffRoles.TRAINER

const allRoles: TAllRoles[] = [
	EStuffRoles.DIRECTOR,
	EStuffRoles.ADMIN,
	EStuffRoles.TRAINER
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
		allowedRoles: [EStuffRoles.DIRECTOR]
	},
	{
		title: 'Персонал',
		path: '/stuff',
		icon: <CloudCog />,
		allowedRoles: [EStuffRoles.DIRECTOR]
	}
]
