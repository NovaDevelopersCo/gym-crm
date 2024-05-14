import { useParams } from 'react-router-dom'

import { useGetClientByIdQuery } from '@/store'

import { ClientInfo } from '@widgets/ClientInfo'
import { ClientSales } from '@widgets/ClientSales'
import { ClientStagesOfCooperation } from '@widgets/ClientStages'
import { ClientVisits } from '@widgets/ClientVisits'

import { MarkClient } from '@features/MarkClient'

import styles from './ClientProfile.module.scss'

const ClientProfile = () => {
	const { clientId } = useParams()
	const { isError, error } = useGetClientByIdQuery(clientId!)

	return (
		<>
			{!isError ? (
				<>
					<ClientInfo />
					<div className={styles.horizontal__wrapper}>
						<MarkClient />
						<ClientVisits />
					</div>
					<ClientStagesOfCooperation />
					<ClientSales />
				</>
			) : (
				<h1>{JSON.stringify(error)}</h1>
			)}
		</>
	)
}

export default ClientProfile
