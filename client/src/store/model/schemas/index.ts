import IArea from './Area.schema'
import IClient, { EClientStatus } from './Client.schema'
import IGroup from './Group.schema'
import ILocation from './Location.schema'
import IStaff, { EStaffRoles } from './Staff.schema'

export type { IClient, IStaff, IArea, ILocation, IGroup }

export { EStaffRoles, EClientStatus }
