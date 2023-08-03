// src/types/AppraisalTypes.ts
import { ApiLoadingState, ValidationError } from './ApiTypes'

export interface IncomingCycleData {
  id: number
  name: string
  description: string
  toDate: string
  fromDate: string
  active: boolean
  appraisalType: string
  appraisalDuration: string
  level: number
  cycleStartedFlag: boolean
  appraisalStartDate: string
  appraisalEndDate: string
  servicePeriod: number
}

export interface IncomingKPIItem {
  id: number
  name: string
  description: string
  employeeFeedback: null | string
  employeeRating: null | number
  employeeRatingName: null
  manager: null
  managerFeedback: null
  managerRating: null
  frequency: string
  target: string
}

export interface IncomingKRAItem {
  id: number
  name: string
  description: null
  count: number
  designationKraPercentage: number
  kpis: IncomingKPIItem[]
}

export interface IncomingEmployeeData {
  id: number
  designation: string
  acknowledged: null
  fullName: string
  profilePicPath: string
  thumbPicture: string
  departmentName: string
  emailId: string
  empManager: string
}

export interface IncomingAvgRatingDTOItem {
  id: number
  employeeName: string
  employeeId: number
  level: number
  defaultAvgRating: null
  adjustedAvgRating: null
  finalFeedback: null
  defaultAvgRatingName: null
  adjustedAvgRatingName: null
  iAgree: boolean
  departmentName: string
  designationName: string
  discussionSummary: null
}

export interface IncomingAppraisalData {
  id: number
  appraisalCycle: IncomingCycleData
  kra: IncomingKRAItem[]
  employee: IncomingEmployeeData
  formStatus: string
  formStatusvalue: number
  formRating: null
  appraisalFormStatus: null
  adjustedAvgRating: null
  finalFeedback: null
  avgRatingsDtos: IncomingAvgRatingDTOItem[]
  overallAvgRating: string
  overallAvgRatingName: null
  finalRating: null
  finalRatingName: null
  discussionOn: null
  discussionSummary: null
  openForDiscussionFlag: null
  iAgreeFlag: null
  closedSummary: null
  closedOn: null
  pendingWith: null
  closedStatus: null
  closedBy: null
  empDepartmentName: null
  empDesignationName: null
  empAvgRating: null
  empAvgRatingName: null
  manager1Name: null
  requestDiscussion: boolean
}

export interface AppraisalSliceState {
  isLoading: ApiLoadingState
  appraisalData: IncomingAppraisalData
  isAppraisalSubmitBtnEnabled: boolean
  error: ValidationError
}

export enum UpdateEmployeeFieldTypeEnum {
  rating = 'Rating',
  feedback = 'Feedback',
}

export interface AppraisalKraKpiIndexes {
  kraIndex?: number
  kpiIndex?: number
}
export interface UpdateEmployeeEnteredDataDTO {
  updatedValue: string
  kraId: number
  kpiId: number
}

export interface UpdateEmployeeData {
  data: UpdateEmployeeEnteredDataDTO
  updateType: UpdateEmployeeFieldTypeEnum
}
