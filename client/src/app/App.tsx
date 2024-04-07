import { RouterProvider } from 'react-router-dom'

import { ConfigProvider } from 'antd'

import { StoreProvider } from '@store/index'

import { router } from './routes/router'

function App() {
	return (
		<StoreProvider>
			<ConfigProvider
				theme={{
					components: {
						Input: {
							activeShadow: '0 0 0 2px rgb(15%, 52%, 100%, 1);',
							colorBgContainerDisabled: '#b9b9b9',
							colorTextDisabled: '#000'
						},
						DatePicker: {
							activeShadow: '0 0 0 2px rgb(15%, 52%, 100%, 1);',
							colorBgContainerDisabled: '#b9b9b9',
							colorTextDisabled: '#000',
							controlHeight: 45.14
						},
						Select: {
							multipleItemBorderColor:
								'0 0 0 2px rgb(15%, 52%, 100%, 1);',
							colorBgContainerDisabled: '#b9b9b9',
							colorTextDisabled: '#000',
							controlHeight: 45.14
						}
					}
				}}
			>
				<RouterProvider router={router} />
			</ConfigProvider>
		</StoreProvider>
	)
}

export default App
