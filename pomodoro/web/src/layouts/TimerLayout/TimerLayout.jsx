import { useEffect, useState } from 'react'

import { useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import JournalModalCell from 'src/components/JournalModalCell/JournalModalCell'
import Navbar from 'src/components/Navbar'

import bell from '../../../assets/bell.wav'

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

  //update user email, useEffect, so this only happens once
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

  const [isJournalOpen, setIsJournalOpen] = useState(false)

  const toggleJournalModal = () => {
    setIsJournalOpen(!isJournalOpen)
  }
  return (
    <div className="bg-red-400 h-screen">
      <Toaster />
      <Navbar onJournalButtonClick={toggleJournalModal} />
      {isJournalOpen && <JournalModalCell onClose={toggleJournalModal} />}
      <main>{children}</main>
    </div>
  )
}
export default TimerLayout
