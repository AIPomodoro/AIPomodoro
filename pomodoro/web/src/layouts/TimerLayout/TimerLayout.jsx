import { Link, routes } from '@redwoodjs/router'
import Navbar from 'src/components/Navbar'
const TimerLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default TimerLayout
