import { IClient } from '../client'
import { IClub } from '../club'
import { IDirection } from '../direction'

export default interface IGroup {
	id: string
	name: string
	direction: IDirection['id']
	club: IClub['id']
	users: IClient[]
}
