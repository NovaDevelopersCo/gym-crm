import { IGroup } from '../group'

export default interface IDirection {
	id: string
	name: string
	groups: IGroup[]
}
