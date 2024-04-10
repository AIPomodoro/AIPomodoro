import { useTimerContext } from 'src/providers/contexts/TimerContext'

const Timer = () => {
  const { time, isRunning, setIsRunning, isBreak, resetTimer } =
    useTimerContext()
  return (
    <div className="m-auto w-auto rounded-lg p-5 text-center font-medium tracking-tighter text-red-50">
      {isBreak ? <h2 className="text-2xl">Break</h2> : <h2 className="text-2xl">Work</h2>}
      <span className="text-9xl">
        {String(Math.floor(time / 60)).padStart(2, '0')}:
        {String(Math.floor(time % 60)).padStart(2, '0')}
      </span>
      <div>
        <button
          className="text-red-900 mb-2 h-12 w-32 rounded-md bg-red-50 p-1 text-xl shadow-md hover:bg-red-100"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <br></br>
        <button onClick={resetTimer} className="hover:underline">
          reset
        </button>
      </div>
    </div>
  )
}

export default Timer
