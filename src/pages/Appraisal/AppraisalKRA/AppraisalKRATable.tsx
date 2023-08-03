// src/pages/Appraisal/AppraisalKRATable/AppraisalKRATable.tsx
import React, { useState } from 'react'
import { useTypedSelector } from '../../../stateStore'
import AppraisalKRATableRow from './AppraisalKRATableRow'
import { IncomingKRAItem } from '../../../types/AppraisalTypes'
import { initialAppraisalKra } from '../../../reducers/AppraisalSliceConstants'

const AppraisalKRATable = (): JSX.Element => {
  const appraisalData = useTypedSelector(
    (state) => state.appraisal.appraisalData,
  )
  // current expanded kra
  const [currentKra, setCurrentKra] =
    useState<IncomingKRAItem>(initialAppraisalKra)

  const currentKraHandler = (
    e: React.MouseEvent<HTMLElement>,
    kra: IncomingKRAItem,
  ) => {
    e.preventDefault()
    setCurrentKra(kra)
  }
  return (
    <table className="w-75">
      <thead className="bg-primary text-white">
        <tr>
          <th className="p-2"></th>
          <th className="p-2">KRA Name</th>
          <th className="p-2">Weightage(%)</th>
          <th className="p-2">No.of KPIs</th>
        </tr>
      </thead>
      <tbody>
        {appraisalData.kra.map((kraItem, kraIndex) => (
          <AppraisalKRATableRow
            key={kraIndex}
            kraIndex={kraIndex}
            kra={kraItem}
            openedKra={currentKra}
            openKraHandler={currentKraHandler}
          />
        ))}
      </tbody>
    </table>
  )
}

export default AppraisalKRATable
