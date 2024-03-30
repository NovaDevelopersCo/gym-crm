import { RouterProvider } from 'react-router-dom'

import { StoreProvider } from '@store/index'

import { router } from './routes/router'

function App() {
	return (
		<StoreProvider>
			<RouterProvider router={router} />
		</StoreProvider>
	)
}

export default App
