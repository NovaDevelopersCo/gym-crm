import { RouterProvider } from 'react-router-dom'

import { ConfigProvider } from 'antd'

import { StoreProvider } from '@store/index'

import { router } from './routes/router'
import AntDesignTheme from './styles/AntDesign.theme'

function App() {
	return (
		<StoreProvider>
			<ConfigProvider theme={AntDesignTheme}>
				<RouterProvider router={router} />
			</ConfigProvider>
		</StoreProvider>
	)
}

export default App
