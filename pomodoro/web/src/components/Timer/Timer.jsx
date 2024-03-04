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
    <div className="m-auto w-auto rounded-lg bg-slate-500 p-5 text-center font-medium tracking-tighter">
      <span className="text-9xl">
        {String(Math.floor(time / 60)).padStart(2, '0')}:
        {String(Math.floor(time % 60)).padStart(2, '0')}
      </span>
      <div>
        <button
          className="h-12 w-32 rounded-md bg-slate-100 p-1 text-xl shadow-md hover:bg-slate-300"
          onClick={() => setIsRunning(!isRunning)}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default Timer
