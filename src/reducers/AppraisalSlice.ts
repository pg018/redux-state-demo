// src/reducers/AppraisalSlice.ts
import { AxiosError } from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AppraisalSliceState } from '../types/AppraisalTypes'
import { ApiLoadingState, ValidationError } from '../types/ApiTypes'
import { initialAppraisalData } from './AppraisalSliceConstants'
import appraisalApi from '../api/AppraisalApi'

const initialAppraisalState: AppraisalSliceState = {
  isLoading: ApiLoadingState.idle,
  appraisalData: initialAppraisalData,
  isAppraisalSubmitBtnEnabled: false,
  error: null,
}

const getAppraisalDataThunk = createAsyncThunk(
  'Appraisal/getAppraisalDataThunk',
  async (_, thunkApi) => {
    try {
      return await appraisalApi.getAppraisalData()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const appraisalSlice = createSlice({
  name: 'Appraisal',
  initialState: initialAppraisalState,
  reducers: {
    updateKRAListInAppraisal: (state, action) => {
      state.appraisalData = {
        ...state.appraisalData,
        kra: action.payload,
      }
    },
    setAppraisalSubmitBtnEnabled: (state, action) => {
      console.log(action.payload)
      state.isAppraisalSubmitBtnEnabled = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAppraisalDataThunk.pending, (state) => {
      state.isLoading = ApiLoadingState.loading
      state.error = null
    })
    builder.addCase(getAppraisalDataThunk.fulfilled, (state, action) => {
      state.appraisalData = action.payload
      state.isLoading = ApiLoadingState.succeeded
    })
    builder.addCase(getAppraisalDataThunk.rejected, (state, action) => {
      state.isLoading = ApiLoadingState.failed
      state.error = action.payload as ValidationError
    })
  },
})

const appraisalThunks = {
  getAppraisalDataThunk,
}

export const appraisalServices = {
  ...appraisalThunks,
  actions: appraisalSlice.actions,
}

const appraisalReducer = appraisalSlice.reducer
export default appraisalReducer
