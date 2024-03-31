//eslint-disable-next-line
import clientsData from '@/data/clients.data.json'

import { More } from './@more/More'
import cl from './ClientItem.module.scss'

export const ClientItem = () => {
	return (
		<div className={cl.root}>
			<div className={`${cl.root__container} ${cl.scrollbar_disable}`}>
				{clientsData.map(client => (
					<ul
						key={client.id}
						className={cl.root__container__primaryList}
					>
						<li
							className={
								cl.root__container__primaryList_primaryItem
							}
						>
							<div
								className={
									cl.root__container__primaryList_primaryItem_clientMore
								}
							>
								<More />
							</div>
							<div
								className={
									cl.root__container__primaryList_primaryItem_clientName
								}
							>
								<span>{client.last_name}</span>
								<span>{client.first_name}</span>
							</div>
						</li>
						<li
							className={
								cl.root__container__primaryList_primaryItem
							}
						>
							{client.address}
						</li>
						<li
							className={
								cl.root__container__primaryList_primaryItem
							}
						>
							{client.register_date}
						</li>
						<li
							className={
								cl.root__container__primaryList_primaryItem
							}
						>
							<span
								className={
									cl.root__container__primaryList_primaryItem_item
								}
							>
								<img
									className={
										cl.root__container__primaryList_primaryItem_item_status
									}
									src='/positive.svg'
									alt='positive'
								/>
								<span>Пробное посещение:</span>
							</span>
							<span>{client.trial_visit}</span>
						</li>
						<li
							className={
								cl.root__container__primaryList_primaryItem
							}
						>
							{client.role}
						</li>
						{/* </ul> */}
					</ul>
				))}
			</div>
		</div>
	)
}
