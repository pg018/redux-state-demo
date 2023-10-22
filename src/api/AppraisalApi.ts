// src/api/AppraisalApi.ts
import axios from 'axios'
import { IncomingAppraisalData } from '../types/AppraisalTypes'

const getAppraisalData = async (): Promise<IncomingAppraisalData> => {
  const response = await axios.get(
    'https://run.mocky.io/v3/0407be72-547c-422c-9146-5e92985eabb4',
    {
      responseType: 'json',
    },
  )
  return response.data
}

const appraisalApi = {
  getAppraisalData,
}

export default appraisalApi
