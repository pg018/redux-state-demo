// src/pages/Appraisal/AppraisalHelpers.ts
import {
  IncomingKRAItem,
  AppraisalKraKpiIndexes,
  UpdateEmployeeData,
  UpdateEmployeeFieldTypeEnum,
  IncomingKPIItem,
} from '../../types/AppraisalTypes'

export const performanceRatingsList: number[] = [5, 4, 3, 2, 1, 0]

export const defaultRating = -1
export const defaultComments = ''

export const getKpiKraIndexesFromList = (
  kraList: IncomingKRAItem[],
  kraId: number,
  kpiId: number,
): AppraisalKraKpiIndexes => {
  // searching for kra
  const searchedKraIndex = kraList.findIndex((kra) => kra.id === kraId)
  if (searchedKraIndex !== -1) {
    // if kra is found
    //searching for kpi in that kra
    const searchedKpiIndex = kraList[searchedKraIndex].kpis.findIndex(
      (kpi) => kpi.id === kpiId,
    )
    if (searchedKpiIndex !== -1) {
      // if kpi is found
      // returning the indices of the kra and kpi found
      return {
        kraIndex: searchedKraIndex,
        kpiIndex: searchedKpiIndex,
      }
    }
  }
  // don't exist. returing undefined
  return {
    kraIndex: undefined,
    kpiIndex: undefined,
  }
}

export const getFinalRatingValue = (ratingString: number): number | null => {
  return ratingString === defaultRating ? null : +ratingString
}

export const getFinalCommentsValue = (comments: string): string | null => {
  return comments.trim().length === 0 ? null : comments
}

export const getUpdatedAppraisalKRAList = (
  initialKraList: IncomingKRAItem[],
  allData: UpdateEmployeeData,
): IncomingKRAItem[] => {
  // destructuring the incoming data
  const { data, updateType } = allData
  const { kraId, kpiId, updatedValue } = data

  // getting the indexes of the updated kpi and its kra
  const { kraIndex, kpiIndex } = getKpiKraIndexesFromList(
    initialKraList,
    kraId,
    kpiId,
  )
  const kraListCopy = [...initialKraList]
  // if the kra and its kpi exist
  if (kraIndex !== undefined && kpiIndex !== undefined) {
    const kpiListCopy = [...kraListCopy[kraIndex].kpis]

    // if employee rating is to be updated
    if (updateType === UpdateEmployeeFieldTypeEnum.rating) {
      kpiListCopy[kpiIndex] = {
        ...kpiListCopy[kpiIndex],
        employeeRating: getFinalRatingValue(+updatedValue),
      }
    } else {
      // if employee comments is to be updated
      kpiListCopy[kpiIndex] = {
        ...kpiListCopy[kpiIndex],
        employeeFeedback: getFinalCommentsValue(updatedValue),
      }
    }

    kraListCopy[kraIndex] = {
      ...kraListCopy[kraIndex],
      kpis: kpiListCopy,
    }
    return kraListCopy
  }
  return kraListCopy
}

// returns the initial kra list thtat came from api
export const clearUserInputKRAList = (
  kraList: IncomingKRAItem[],
): IncomingKRAItem[] => {
  const kraListCopy = [...kraList]
  // creating a new array which will be sent from this function
  const newKraList: IncomingKRAItem[] = []
  for (const kraItem of kraListCopy) {
    const kpiList = [...kraItem.kpis]
    const newKpiList: IncomingKPIItem[] = []
    for (let kpi of kpiList) {
      // updating each kpi
      const newKpi: IncomingKPIItem = {
        ...kpi,
        employeeRating: null,
        employeeFeedback: null,
      }
      // pushing the new kpi to the updated kpi list
      newKpiList.push(newKpi)
    }
    // pushing the final updated kpi list to the new kra list
    newKraList.push({ ...kraItem, kpis: newKpiList })
  }
  // returning the new kra list
  return newKraList
}

// it returns true if the conditions are satisfied i.e. the button is enabled
export const checkIfSubmitButtonIsEnabled = (
  kraList: IncomingKRAItem[],
): boolean => {
  for (const thisKra of kraList) {
    // checking if any other data that is required is missing or not
    const notSatisfiedKPIs = thisKra.kpis.filter(
      (kpi) =>
        kpi.employeeRating === null ||
        kpi.employeeFeedback === null ||
        kpi.employeeFeedback.trim().length < 50,
    )
    if (notSatisfiedKPIs.length > 0) {
      // some required data is not entered by the employee
      return false
    }
  }
  return true
}
