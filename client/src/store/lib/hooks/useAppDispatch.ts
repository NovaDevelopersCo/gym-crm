import { useDispatch } from 'react-redux'

import { AppDispatch } from '@/store'

// There is no need to use this because useActions exist
const useAppDispatch: () => AppDispatch = useDispatch

export default useAppDispatch
