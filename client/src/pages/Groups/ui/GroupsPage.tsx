import { GroupsList } from '@widgets/GroupsList'

import { AddGroupForm } from '@features/AddGroup'

const GroupsPage = () => {
	return (
		<>
			<AddGroupForm />
			<GroupsList />
		</>
	)
}

export default GroupsPage
