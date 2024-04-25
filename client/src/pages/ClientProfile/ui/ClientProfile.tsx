import { ClientInfo } from '@widgets/ClientInfo'
import { StagesOfCooperation } from '@widgets/StagesOfCooperation'

import { MarkClient } from '@features/Client/'

const ClientProfile = () => {
	return (
		<div>
			<ClientInfo />
			<StagesOfCooperation />
			<MarkClient />
		</div>
	)
}

export default ClientProfile
