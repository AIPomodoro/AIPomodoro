import { useTimerContext } from 'src/layouts/TimerLayout'
const Timer = ({ time, isRunning, toggleRunning, isBreak, reset }) => {
  return (
    <div className="m-auto w-auto rounded-lg bg-slate-500 p-5 text-center font-medium tracking-tighter">
      {isBreak ? <h2>Break</h2> : <h2>Work</h2>}
      <span className="text-9xl">
        {String(Math.floor(time / 60)).padStart(2, '0')}:
        {String(Math.floor(time % 60)).padStart(2, '0')}
      </span>
      <div>
        <button
          className="mb-2 h-12 w-32 rounded-md bg-slate-100 p-1 text-xl shadow-md hover:bg-slate-300"
          onClick={toggleRunning}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <br></br>
        <button onClick={reset} className="hover:underline">
          reset
        </button>
      </div>
    </div>
  )
}

export default Timer
