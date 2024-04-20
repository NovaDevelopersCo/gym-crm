import { IClub } from '@/store'

export const clubsArr: Array<
	Omit<IClub, 'users' | 'groups' | 'admin_id'> &
		Partial<Pick<IClub, 'users' | 'groups' | 'admin_id'>>
> = [
	{
		id: '1',
		name: 'Club 1',
		address: 'Address 1'
	},
	{
		id: '2',
		name: 'Club 2',
		address: 'Address 2'
	},
	{
		id: '3',
		name: 'Club 3',
		address: 'Address 3'
	}
]
