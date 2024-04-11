import { GoGear } from 'react-icons/go'

import { useTimerContext } from 'src/providers/contexts/TimerContext'

const Timer = () => {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    time,
    isRunning,
    setIsRunning,
    isBreak,
    resetTimer,
  } = useTimerContext()
  return (
    <div className=" m-auto w-auto rounded-lg p-5 text-center font-medium tracking-tighter text-red-50">
      <div className="flex w-full items-center justify-between">
        <div className="flex-grow">
          {isBreak ? (
            <h2 className="text-2xl">Break</h2>
          ) : (
            <h2 className="text-2xl">Work</h2>
          )}
        </div>
        <div className="w-0">
          <button
            className="relative right-4 top-0 h-12 w-12 origin-center transition duration-500 hover:rotate-180"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            <div className="flex h-full w-full items-center justify-center">
              <GoGear size={24} />
            </div>
          </button>
        </div>
      </div>

      <span className="text-9xl">
        {String(Math.floor(time / 60)).padStart(2, '0')}:
        {String(Math.floor(time % 60)).padStart(2, '0')}
      </span>
      <div>
        <button
          className="mb-2 h-12 w-32 rounded-md bg-red-50 p-1 text-xl text-red-900 shadow-md hover:bg-red-100"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <br></br>
        <div className="">
          <button onClick={resetTimer} className="hover:underline">
            reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default Timer
