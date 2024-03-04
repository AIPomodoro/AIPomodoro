import { useState, useEffect } from 'react'

const Timer = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        if (time > 0) setTime((time) => time - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [time, isRunning])

  let buttonText = isRunning ? 'Pause' : 'Start'
  return (
    <div className="m-auto w-1/2 rounded-lg bg-slate-500 text-center align-middle">
      <span className="text-9xl">
        {Math.floor(time / 60)}:{String(Math.floor(time % 60)).padStart(2, '0')}
      </span>
      <div>
        <button onClick={() => setIsRunning(!isRunning)}>{buttonText}</button>
      </div>
    </div>
  )
}

export default Timer
