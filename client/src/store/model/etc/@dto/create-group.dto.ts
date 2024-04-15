import { IGroup } from '@store/model'

export default interface CreateGroupDto extends Pick<IGroup, 'name'> {}
