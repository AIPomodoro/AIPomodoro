import { useState, useEffect } from 'react'

import { useAuth } from 'src/auth'

import bell from '../../../assets/bell.wav'
import RatingModal from '../RatingModal/RatingModal'

const Timer = ({ settings, isRatingOpen, openRating, handleRating }) => {
  const { currentUser } = useAuth()
  const [isBreak, setIsBreak] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  let initialTime = currentUser?.profile?.workDuration || 3
  const [time, setTime] = useState(initialTime)

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        if (time > 0) {
          setTime((time) => time - 1)
          if (time === 1 && settings.soundEnabled) new Audio(bell).play()
        } else if (time === 0) {
          let newTime = isBreak
            ? currentUser?.profile?.workDuration || 3
            : currentUser?.profile?.breakDuration || 2

          if (!settings.autoStart) {
            if (!isBreak) openRating()
            setIsRunning(false)
          }
          setIsBreak(!isBreak)
          setTime(newTime)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [time, isRunning, isBreak, currentUser, settings, openRating])

  let buttonText = isRunning ? 'Pause' : 'Start'

  return (
    <div className="m-auto w-auto rounded-lg bg-slate-500 p-5 text-center font-medium tracking-tighter">
      {isBreak ? <h2>Break</h2> : <h2>Work</h2>}
      <span className="text-9xl">
        {String(Math.floor(time / 60)).padStart(2, '0')}:
        {String(Math.floor(time % 60)).padStart(2, '0')}
      </span>
      <div>
        <button
          className="h-12 w-32 rounded-md bg-slate-100 p-1 text-xl shadow-md hover:bg-slate-300"
          onClick={() => {
            setIsRunning(!isRunning)
          }}
        >
          {buttonText}
        </button>
      </div>
      <RatingModal isOpen={isRatingOpen} handleRating={handleRating} />
    </div>
  )
}

export default Timer
