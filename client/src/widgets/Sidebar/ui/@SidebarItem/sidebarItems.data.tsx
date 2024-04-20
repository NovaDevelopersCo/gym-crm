import { EStaffRoles } from '@/store'
import { BarChart3, Building2, CloudCog, Home, Users } from 'lucide-react'

type TAllRoles = EStaffRoles.ADMIN | EStaffRoles.DIRECTOR | EStaffRoles.TRAINER

const allRoles: TAllRoles[] = [
	EStaffRoles.DIRECTOR,
	EStaffRoles.ADMIN,
	EStaffRoles.TRAINER
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
		allowedRoles: [EStaffRoles.DIRECTOR]
	},
	{
		title: 'Направления',
		path: '/directions',
		icon: <Building2 />,
		allowedRoles: [EStaffRoles.DIRECTOR, EStaffRoles.ADMIN]
	},
	{
		title: 'Клубы',
		path: '/clubs',
		icon: <Building2 />,
		allowedRoles: [EStaffRoles.DIRECTOR]
	},
	{
		title: 'Персонал',
		path: '/Staff',
		icon: <CloudCog />,
		allowedRoles: [EStaffRoles.DIRECTOR]
	}
]
