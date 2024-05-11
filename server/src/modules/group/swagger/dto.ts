import { ApiProperty, OmitType } from '@nestjs/swagger'
import { GroupEntity } from '../entities'
import { ClubDto } from '@/modules/club/swagger'

export class GroupDto extends OmitType(GroupEntity, ['direction', 'club', 'users']) {}
export class GroupClubDto extends GroupDto {
	@ApiProperty({
		type: () => ClubDto
	})
	public readonly club: ClubDto
}
