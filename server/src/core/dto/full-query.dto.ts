import { SearchDto } from './search.dto'
import { PaginationDto } from './pagination.dto'
import { SortDto } from './sort.dto'
import { IntersectionType } from '@nestjs/swagger'

export class FullQueryDto extends IntersectionType(PaginationDto, SortDto, SearchDto) {}
