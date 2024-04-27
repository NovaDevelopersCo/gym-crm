import { RouterProvider } from 'react-router-dom'

import { StoreProvider } from '@/store'
import { ConfigProvider } from 'antd'

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
