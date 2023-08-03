// src/pages/Appraisal/AppraisalKRATable/AppraisalKRATableRow.tsx
import React from 'react'
import { IncomingKRAItem } from '../../../types/AppraisalTypes'
import { initialAppraisalKra } from '../../../reducers/AppraisalSliceConstants'
import AppraisalKPITable from '../AppraisalKPI/AppraisalKPITable'

const AppraisalKRATableRow = ({
  kraIndex,
  kra,
  openedKra,
  openKraHandler,
}: {
  kraIndex: number
  kra: IncomingKRAItem
  openedKra: IncomingKRAItem
  openKraHandler: (
    e: React.MouseEvent<HTMLElement>,
    kra: IncomingKRAItem,
  ) => void
}): JSX.Element => {
  return (
    <>
      <tr key={kraIndex}>
        <td>
          {openedKra.id === kra.id ? (
            // this kra's kpi is displayed. On clicking - button, the kpi table is closed
            <i
              className="fa fa-minus-circle"
              onClick={(e) => openKraHandler(e, initialAppraisalKra)}
            ></i>
          ) : (
            // this kra's kpi is not displayed yet. on clicking + button, we can see kpis
            <i
              className="fa fa-plus-circle"
              onClick={(e) => openKraHandler(e, kra)}
            ></i>
          )}
        </td>
        <td>{kra.name}</td>
        <td>{kra.designationKraPercentage}</td>
        <td>{kra.count}</td>
      </tr>
      {openedKra.id === kra.id && (
        <tr>
          <td colSpan={8}>
            <AppraisalKPITable kraId={kra.id} kpiList={kra.kpis} />
          </td>
        </tr>
      )}
    </>
  )
}

export default AppraisalKRATableRow
