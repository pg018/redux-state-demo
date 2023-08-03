// src/pages/Appraisal/Appraisal.tsx
import React, { useEffect } from 'react'
import AppraisalKRATable from './AppraisalKRA/AppraisalKRATable'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import { appraisalServices } from '../../reducers/AppraisalSlice'
import {
  checkIfSubmitButtonIsEnabled,
  clearUserInputKRAList,
} from './AppraisalHelpers'
import OLoadingSpinner from '../../components/OLoadingSpinner'
import { ApiLoadingState } from '../../types/ApiTypes'

const Appraisal = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const isButtonEnabled = useTypedSelector(
    (state) => state.appraisal.isAppraisalSubmitBtnEnabled,
  )
  const isLoading = useTypedSelector((state) => state.appraisal.isLoading)
  const kraList = useTypedSelector((state) => state.appraisal.appraisalData.kra)
  useEffect(() => {
    dispatch(appraisalServices.getAppraisalDataThunk())
  }, [])

  useEffect(() => {
    // validating if button must be enabled whenever kraList changes i.e. user input
    dispatch(
      appraisalServices.actions.setAppraisalSubmitBtnEnabled(
        checkIfSubmitButtonIsEnabled(kraList),
      ),
    )
  }, [kraList])

  const submitBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('calling the submit button api')
  }

  const clearBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(
      appraisalServices.actions.updateKRAListInAppraisal(
        clearUserInputKRAList(kraList),
      ),
    )
  }

  return (
    <>
      {
        // displayed when api in loading/failed state. If already loaded, then showing for failed state
        isLoading !== ApiLoadingState.succeeded && <OLoadingSpinner />
      }
      <div className="d-flex flex-column w-100 align-items-center">
        <div className="d-flex align-items-center justify-content-center mt-5 w-100">
          <AppraisalKRATable />
        </div>
        <div className="d-flex flex-row align-items-center">
          <button
            className="bg-success text-white"
            disabled={!isButtonEnabled}
            onClick={submitBtnHandler}
          >
            Submit
          </button>
          <button
            className="bg-warning text-white ms-2"
            onClick={clearBtnHandler}
          >
            Clear
          </button>
        </div>
      </div>
    </>
  )
}

export default Appraisal
