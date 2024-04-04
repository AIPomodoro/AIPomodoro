import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import RatingModal from 'src/components/RatingModal/RatingModal'
import Timer from 'src/components/Timer/Timer'
import { useTimerContext } from 'src/providers/contexts/TimerContext'

const DashPage = () => {
  const { loading } = useAuth()
  const { isRatingOpen } = useTimerContext()
  if (loading) return <p>Loading...</p>

  return (
    <>
      <div>
        <Metadata title="Dash" description="Dash page" />
        <div className="flex h-48 justify-center">
          <Timer />
        </div>
      </div>
      {isRatingOpen && <RatingModal></RatingModal>}
    </>
  )
}

export default DashPage
