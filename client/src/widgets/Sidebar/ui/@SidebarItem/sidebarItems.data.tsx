import { EStaffRoles } from '@/store'
import {
	BarChart3,
	Building2,
	CloudCog,
	Home,
	TicketPercent,
	Users
} from 'lucide-react'

type TAllRoles = EStaffRoles.ADMIN | EStaffRoles.DIRECTOR

const allRoles: TAllRoles[] = [EStaffRoles.DIRECTOR, EStaffRoles.ADMIN]

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
		title: 'Группы',
		path: '/groups',
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
		path: '/staff',
		icon: <CloudCog />,
		allowedRoles: [EStaffRoles.DIRECTOR]
	},
	{
		title: 'Абонементы',
		path: '/abonements',
		icon: <TicketPercent />,
		allowedRoles: [EStaffRoles.DIRECTOR]
	}
]
