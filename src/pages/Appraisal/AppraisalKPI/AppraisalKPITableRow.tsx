// src/pages/Appraisal/AppraisalKPITable/AppraisalKPITableRow.tsx
import { useMemo } from 'react'
import {
  IncomingKPIItem,
  UpdateEmployeeData,
  UpdateEmployeeFieldTypeEnum,
} from '../../../types/AppraisalTypes'
import {
  defaultComments,
  defaultRating,
  getUpdatedAppraisalKRAList,
  performanceRatingsList,
} from '../AppraisalHelpers'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { appraisalServices } from '../../../reducers/AppraisalSlice'

const AppraisalKPITableRow = ({
  kraId,
  kpiIndex,
  kpi,
}: {
  kraId: number
  kpiIndex: number
  kpi: IncomingKPIItem
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const kraList = useTypedSelector((state) => state.appraisal.appraisalData.kra)
  const selectedRating = useMemo(() => {
    return kpi.employeeRating === null
      ? defaultRating.toString()
      : kpi.employeeRating.toString()
  }, [kpi])
  const finalComments = useMemo(() => {
    return kpi.employeeFeedback === null
      ? defaultComments
      : kpi.employeeFeedback
  }, [kpi])

  const ratingChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ratingDTO: UpdateEmployeeData = {
      data: {
        updatedValue: e.target.value,
        kraId,
        kpiId: kpi.id,
      },
      updateType: UpdateEmployeeFieldTypeEnum.rating,
    }
    dispatch(
      appraisalServices.actions.updateKRAListInAppraisal(
        getUpdatedAppraisalKRAList(kraList, ratingDTO),
      ),
    )
  }

  const commentsChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const commentsDTO: UpdateEmployeeData = {
      data: {
        updatedValue: e.target.value,
        kraId,
        kpiId: kpi.id,
      },
      updateType: UpdateEmployeeFieldTypeEnum.feedback,
    }
    dispatch(
      appraisalServices.actions.updateKRAListInAppraisal(
        getUpdatedAppraisalKRAList(kraList, commentsDTO),
      ),
    )
  }

  return (
    <tr>
      <td>{kpiIndex + 1}</td>
      <td className="text-primary">{kpi.name}</td>
      <td>
        <select
          value={selectedRating.toString()}
          onChange={ratingChangeHandler}
        >
          <option value={defaultRating}>Select Rating</option>
          {performanceRatingsList.map((pRating, pRatingIndex) => (
            <option key={pRatingIndex} value={pRating.toString()}>
              {pRating.toString()}
            </option>
          ))}
        </select>
      </td>
      <td>
        <div className="d-flex flex-column">
          <textarea
            placeholder="Comments"
            value={finalComments}
            onChange={commentsChangeHandler}
          />
          {finalComments !== defaultComments &&
            finalComments.trim().length < 50 && (
              <h6 className="text-danger">
                Please enter atleast 50 characters
              </h6>
            )}
        </div>
      </td>
    </tr>
  )
}

export default AppraisalKPITableRow
