import { useState, useEffect } from 'react'

import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Timer from 'src/components/Timer/Timer'

const DashPage = () => {
  const { isAuthenticated, currentUser, loading } = useAuth()
  const [isBreak, setIsBreak] = useState(false)

  if (loading) {
    return <p>Loading...</p>
  }

  let time
  if (!isBreak) {
    time = currentUser?.profile?.workDuration
  } else {
    time = currentUser?.profile?.breakDuration
  }

  return (
    <>
      <Metadata title="Dash" description="Dash page" />
      <div className="flex h-48 justify-center">
        <Timer initialTime={Number(time)} />
      </div>
    </>
  )
}

export default DashPage
