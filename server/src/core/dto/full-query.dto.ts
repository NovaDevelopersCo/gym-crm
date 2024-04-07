import { SearchDto } from './search.dto'
import { PaginationQueryDto } from '../pagination'
import { SortDto } from './sort.dto'
import { IntersectionType } from '@nestjs/swagger'

export class FullQueryDto extends IntersectionType(PaginationQueryDto, SortDto, SearchDto) {}
