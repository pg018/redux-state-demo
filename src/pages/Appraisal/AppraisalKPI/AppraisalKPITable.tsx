// src/pages/Appraisal/AppraisalKPITable/AppraisalKPITable.tsx
import { IncomingKPIItem } from '../../../types/AppraisalTypes'
import AppraisalKPITableRow from './AppraisalKPITableRow'

const AppraisalKPITable = ({
  kraId,
  kpiList,
}: {
  kraId: number
  kpiList: IncomingKPIItem[]
}): JSX.Element => {
  return (
    <table className="w-100 bg-light">
      <thead className="bg-primary text-white">
        <tr>
          <th>#</th>
          <th>KPI Name</th>
          <th>Self Rating</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>
        {kpiList.map((kpiItem, kpiIndex) => (
          <AppraisalKPITableRow
            key={kpiIndex}
            kpi={kpiItem}
            kpiIndex={kpiIndex}
            kraId={kraId}
          />
        ))}
      </tbody>
    </table>
  )
}

export default AppraisalKPITable
