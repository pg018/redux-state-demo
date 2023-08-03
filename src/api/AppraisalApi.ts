import axios from 'axios'
import { IncomingAppraisalData } from '../types/AppraisalTypes'

const getAppraisalData = async (): Promise<IncomingAppraisalData> => {
  const response = await axios.get(
    'https://run.mocky.io/v3/63db532f-e7a2-4dfc-8ece-ef5fff714ca5',
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
