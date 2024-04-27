import { useStore } from 'react-redux'

import { AppStore } from '@/store'

const useAppStore: () => AppStore = useStore

export default useAppStore
