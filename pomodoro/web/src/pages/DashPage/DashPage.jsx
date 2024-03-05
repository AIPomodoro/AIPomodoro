import { Metadata } from '@redwoodjs/web'

import Timer from 'src/components/Timer/Timer'

const DashPage = () => {
  return (
    <>
      <Metadata title="Dash" description="Dash page" />
      <div className="flex h-48 justify-center">
        <Timer initialTime={1500} />
      </div>
    </>
  )
}

export default DashPage
