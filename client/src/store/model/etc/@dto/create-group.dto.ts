import { IGroup } from '@/store'

export default interface CreateGroupDto extends Pick<IGroup, 'name'> {}
