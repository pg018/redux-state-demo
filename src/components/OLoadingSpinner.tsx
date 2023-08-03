// src/components/OLoadingSpinner.tsx
import ReactDOM from 'react-dom'

const OLoadingSpinner = (): JSX.Element => {
  // these two are div elements written in public/index.html parallel to the root div
  const backdrop = document.getElementById('backdrop-root')!
  const overlay = document.getElementById('overlay-root')!
  return (
    <>
      {
      // creating a portal for inner cop
      ReactDOM.createPortal(
        <div className="loading-spinner-backdrop"></div>,
        backdrop,
      )}
      {ReactDOM.createPortal(
        <div className="loading-spinner">
          <h6>Loading</h6>
        </div>,
        overlay,
      )}
    </>
  )
}

export default OLoadingSpinner
