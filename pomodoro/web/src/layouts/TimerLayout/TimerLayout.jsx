import { useEffect, useState, createContext, useContext } from 'react'

import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const UPDATE_PROFILE = gql`
  mutation UpdateProfileMutation($id: Int!, $input: UpdateProfileInput!) {
    updateProfile(id: $id, input: $input) {
      email
    }
  }
`

const TimerContext = createContext()
export const useTimerContext = () => useContext(TimerContext)

const TimerLayout = ({ children }) => {
  const { isAuthenticated, currentUser, userMetadata, loading } = useAuth()
  const [updateEmail] = useMutation(UPDATE_PROFILE)

  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)

  //update user email
  useEffect(() => {
    if (
      currentUser?.profile?.email == null &&
      currentUser?.profile?.id &&
      userMetadata?.email &&
      isAuthenticated
    ) {
      updateEmail({
        variables: {
          id: currentUser?.profile?.id,
          input: { email: userMetadata?.email },
        },
      })
    }
  }, [currentUser, isAuthenticated, userMetadata, updateEmail])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <TimerContext.Provider
        value={{
          isSettingsOpen,
          setIsSettingsOpen,
          isNavMenuOpen,
          setIsNavMenuOpen,
        }}
      >
        {/* <Navbar isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} /> */}
        <main>{children}</main>
      </TimerContext.Provider>
    </>
  )
}

export default TimerLayout
