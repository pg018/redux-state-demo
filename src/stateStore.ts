// src/stateStore.ts
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import appraisalReducer from './reducers/AppraisalSlice'

const allReducers = {
  appraisal: appraisalReducer,
}

const stateStore = configureStore({
  reducer: allReducers,
})

export type RootState = ReturnType<typeof stateStore.getState>
export type AppDispatch = typeof stateStore.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default stateStore
