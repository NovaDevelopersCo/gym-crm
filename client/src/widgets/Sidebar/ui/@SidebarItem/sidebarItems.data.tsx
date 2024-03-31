import { AppWindow, BarChart3 } from 'lucide-react'

export const sidebarItemsArr: {
	title: string
	path: string
	icon: JSX.Element
}[] = [
	{
		title: 'Dashboard',
		path: '/',
		icon: <BarChart3 />
	},
	{
		title: 'Test',
		path: '/test',
		icon: <AppWindow />
	}
]
