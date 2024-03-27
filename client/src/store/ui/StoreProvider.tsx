import { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import { setupStore } from '..'

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
	const store = setupStore()
	return <Provider store={store}>{children}</Provider>
}

export default StoreProvider
