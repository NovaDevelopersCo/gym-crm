import { IArea } from '@/store'

export default interface CreateAreaDto extends Pick<IArea, 'name'> {}
