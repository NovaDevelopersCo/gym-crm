import { BaseEntity } from '@/core/database/entity'
import { AbonementEntity } from '@/modules/abonement/entities'
import { GroupEntity } from '@/modules/group/entities'
import { ProductEntity } from '@/modules/product/entities'
import { StaffEntity } from '@/modules/staff/entities'
import { UserEntity } from '@/modules/user/entities'
import { Column, Entity, OneToMany, ManyToMany } from 'typeorm'
import { ClubPropertiesSwagger } from '../swagger/properties'

@Entity('Club')
export class ClubEntity extends BaseEntity {
	@ClubPropertiesSwagger.address()
	@Column({
		unique: true
	})
	public readonly address: string

	@ClubPropertiesSwagger.name_()
	@Column({
		unique: true
	})
	public readonly name: string

	@ClubPropertiesSwagger.admins()
	@OneToMany(() => StaffEntity, admin => admin.club, { cascade: true })
	public readonly admins: StaffEntity[]

	@ClubPropertiesSwagger.groups()
	@OneToMany(() => GroupEntity, group => group.club, { cascade: true })
	public readonly groups: GroupEntity[]

	@ClubPropertiesSwagger.users()
	@OneToMany(() => UserEntity, user => user.club, { cascade: true })
	public readonly users: UserEntity[]

	@ClubPropertiesSwagger.products()
	@OneToMany(() => ProductEntity, product => product.club, { cascade: true })
	public readonly products: ProductEntity[]

	@ClubPropertiesSwagger.abonements()
	@ManyToMany(() => AbonementEntity)
	public readonly abonements: AbonementEntity[]
}
