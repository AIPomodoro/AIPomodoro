import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
const Navbar = () => {
  const { isAuthenticated, currentUser, signUp, logIn, logOut } = useAuth()
  return (
    <>
      <button onClick={logIn}>log in</button>
      <br></br>
      <button onClick={logOut}>log out</button>
      <p>{JSON.stringify({ isAuthenticated })}</p>
      <p>{JSON.stringify({ currentUser })}</p>
    </>
  )
}

export default Navbar
