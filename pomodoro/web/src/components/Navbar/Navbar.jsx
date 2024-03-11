import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
const Navbar = () => {
  const { isAuthenticated, signUp, logIn } = useAuth()
  return (
    <>
      <button onClick={logIn}>log in</button>
      <p>{JSON.stringify({ isAuthenticated })}</p>

      <p className="text-center font-bold text-green-500">
        this is navbar with tailwind
      </p>
    </>
  )
}

export default Navbar
