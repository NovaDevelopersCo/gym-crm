import IGroup from './Group.schema'

export default interface IDirection {
	id: string
	name: string
	image: string
	groups: IGroup[]
}
