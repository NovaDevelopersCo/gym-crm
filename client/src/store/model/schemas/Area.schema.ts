import IGroup from "./Group.schema"

export default interface IArea {
	id: string
	name: string
	image: string
	groups: IGroup[]
}