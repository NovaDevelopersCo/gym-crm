import { IClient, IDirection } from '.'

export default interface IGroup {
	id: string
	name: string
	users: IClient[]
	trainer: unknown
	direction_id: IDirection['id']
}
