import { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import { setupStore } from '../index'

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
	const ReduxStore = setupStore()
	return <Provider store={ReduxStore}>{children}</Provider>
}

export default StoreProvider
