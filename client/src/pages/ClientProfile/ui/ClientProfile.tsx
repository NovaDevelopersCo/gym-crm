import { ClientInfo } from '@widgets/ClientInfo'
import { Sales } from '@widgets/Sales'
import { StagesOfCooperation } from '@widgets/StagesOfCooperation'

import { MarkClient } from '@features/Client/'

const ClientProfile = () => {
	return (
		<div>
			<ClientInfo />
			<StagesOfCooperation />
			<Sales />
			<MarkClient />
		</div>
	)
}

export default ClientProfile
