import { IClient, IClub } from '.'
import IDirection from './Direction.schema'
import IStuff, { EStuffRoles } from './Stuff.schema'

export default interface IGroup {
	id: string
	name: string
	users: IClient[]
	club: IClub['id']
	trainer: Omit<IStuff, 'role'> & {
		role: EStuffRoles.TRAINER
	}
	direction: IDirection['id']
}
