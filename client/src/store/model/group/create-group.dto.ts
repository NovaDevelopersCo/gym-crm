import { IGroup } from './'

export default interface CreateGroupDto
	extends Pick<IGroup, 'name' | 'direction' | 'club'> {}
