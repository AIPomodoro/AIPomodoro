import { useState, useEffect } from 'react'

import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Timer from 'src/components/Timer/Timer'

const DashPage = () => {
  const { loading } = useAuth()

  if (loading) {
    return <p>Loading...</p>
  }
  return (
    <div>
      <Metadata title="Dash" description="Dash page" />
      <div className="flex h-48 justify-center">
        <Timer />
      </div>
    </div>
  )
}

export default DashPage
