import { IArea } from '@store/model'

export default interface CreateAreaDto extends Pick<IArea, 'name'> {}
