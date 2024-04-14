import { IClient } from '.'
import IArea from './Area.schema'
import IStuff, { EStuffRoles } from './Stuff.schema'

export default interface IGroup {
	id: string
	name: string
	users: IClient[]
	trainer: Omit<IStuff, 'role'> & {
		role: EStuffRoles.TRAINER
	}
	area_id: IArea['id']
}
