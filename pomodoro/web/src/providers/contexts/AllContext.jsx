import { TimerContextProvider } from './TimerContext'

const AllContextProviders = ({ children }) => {
  return <TimerContextProvider>{children}</TimerContextProvider>
}

export default AllContextProviders
