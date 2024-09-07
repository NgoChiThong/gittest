import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
          LuxCine
        </a>
        <span className="ms-1">&copy; 2024 FIT NLU.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
          LuxCine &amp; FITNLU.
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
