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
							colorPrimary: 'var(--accent)',
							colorPrimaryHover: 'var(--accent)',
							controlOutline: 'var(--accent-lighter-transparent)',
							borderRadius: 0,
							borderRadiusLG: 0,
							borderRadiusSM: 0,
							borderRadiusXS: 0,
							controlHeight: 35
						},
						Checkbox: {
							colorFill: 'var(--accent)',
							colorPrimaryHover: 'var(--accent)',

							controlInteractiveSize: 18,
							borderRadiusSM: 0,
							colorPrimary: 'var(--accent)',
							colorPrimaryBorder: 'var(--hover-outline-color)',
							colorBorder: 'var(--hover-outline-color)'
						}
						// Select: {
						// 	colorPrimary: 'var(--accent)',
						// 	colorPrimaryHover: 'var(--accent)',
						// 	controlOutline: 'var(--accent-lighter-transparent)',
						// 	optionSelectedBg:
						// 		'var(--accent-lighter-transparent)',
						// 	borderRadius: 0,
						// 	borderRadiusLG: 0,
						// 	borderRadiusSM: 0,
						// 	borderRadiusXS: 0,
						// 	controlHeight: 35
						// }
					}
				}}
			>
				<RouterProvider router={router} />
			</ConfigProvider>
		</StoreProvider>
	)
}

export default App
