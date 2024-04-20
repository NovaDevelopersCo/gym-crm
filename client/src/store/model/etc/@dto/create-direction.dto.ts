import { IDirection } from '@/store'

export default interface CreateDirectionDto extends Pick<IDirection, 'name'> {}
