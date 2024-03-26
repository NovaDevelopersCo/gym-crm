import { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import { setupStore } from '..'

const store = setupStore()

const StoreProvider: FC<PropsWithChildren> = ({ children }) => (
	<Provider store={store}>{children}</Provider>
)

export default StoreProvider
