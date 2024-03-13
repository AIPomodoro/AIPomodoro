import { useEffect, useState } from 'react'

import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const UPDATE_PROFILE = gql`
  mutation UpdateProfileMutation($id: Int!, $input: UpdateProfileInput!) {
    updateProfile(id: $id, input: $input) {
      email
    }
  }
`

const TimerLayout = ({ children }) => {
  const { isAuthenticated, currentUser, userMetadata, loading } = useAuth()
  const [update] = useMutation(UPDATE_PROFILE)

  //update user email
  useEffect(() => {
    if (
      currentUser?.profile?.email == null &&
      currentUser?.profile?.id &&
      userMetadata?.email &&
      isAuthenticated
    ) {
      update({
        variables: {
          id: currentUser?.profile?.id,
          input: { email: userMetadata?.email },
        },
      })
    }
  }, [currentUser, isAuthenticated, userMetadata, update])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      {/* <Navbar isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} /> */}
      <main>{children}</main>
    </>
  )
}

export default TimerLayout
