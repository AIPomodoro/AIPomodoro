import { useEffect, useState } from 'react'

import { useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import Navbar from 'src/components/Navbar'

const UPDATE_PROFILE_EMAIL = gql`
  mutation UpdateProfileMutation($id: Int!, $input: UpdateProfileInput!) {
    updateProfile(id: $id, input: $input) {
      email
    }
  }
`

const TimerLayout = ({ children }) => {
  const { isAuthenticated, currentUser, userMetadata, loading } = useAuth()

  if (loading) {
    return <p>Loading...</p>
  }

  const [updateProfileEmail] = useMutation(UPDATE_PROFILE_EMAIL)

  //update user email
  useEffect(() => {
    if (
      currentUser?.profile?.email == null &&
      currentUser?.profile?.id &&
      userMetadata?.email &&
      isAuthenticated
    ) {
      updateProfileEmail({
        variables: {
          id: currentUser?.profile?.id,
          input: { email: userMetadata?.email },
        },
      })
    }
  }, [currentUser, isAuthenticated, userMetadata, updateProfileEmail])

  toast('Saved!')

  return (
    <>
      <Toaster />
      <Navbar />
      <main>{children}</main>
    </>
  )
}
export default TimerLayout
