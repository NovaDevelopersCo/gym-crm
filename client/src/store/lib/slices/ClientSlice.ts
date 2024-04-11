import { createSlice } from '@reduxjs/toolkit'

interface IClientState {}

const initialState: IClientState = {}

const clientSlice = createSlice({
	name: 'client/slice',
	initialState,
	reducers: {}
})

export default clientSlice
