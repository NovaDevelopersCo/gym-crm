import { ReactNode } from 'react'

import {
	type NotificationArgsProps,
	notification as noficiationAntd
} from 'antd'
import { NotificationInstance } from 'antd/es/notification/interface'

const notification = ({
	title,
	description,
	type,
	...params
}: {
	title: ReactNode
	description: ReactNode
	type: keyof Omit<NotificationInstance, 'destroy' | 'open'>
	params?: Omit<NotificationArgsProps, 'message' | 'description'>
}) => {
	const [api] = noficiationAntd.useNotification()
	const notificationConfig: NotificationArgsProps = {
		message: title,
		description: description,
		placement: 'top',
		...params
	}
	const notifications = {
		success: api.success,
		info: api.info,
		warning: api.warning,
		error: api.error
	}

	return notifications[type].bind(this, notificationConfig)

	// api.destroy()
}

export default notification
