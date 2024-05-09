import { OmitType } from '@nestjs/swagger'
import { ProductEntity } from '../entities'

export class ProductDto extends OmitType(ProductEntity, ['orders', 'club']) {}
