import { useEffect, useState } from 'react'

import { useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import JournalModalCell from 'src/components/JournalModalCell/JournalModalCell'
import Navbar from 'src/components/Navbar'

import bell from '../../../assets/bell.wav'

const UPDATE_PROFILE = gql`
  mutation UpdateProfileMutation($id: Int!, $input: UpdateProfileInput!) {
    updateProfile(id: $id, input: $input) {
      email
      lastLogin
      currentStreak
    }
  }
`

const TimerLayout = ({ children }) => {
  const { isAuthenticated, currentUser, userMetadata, loading } = useAuth()
  if (loading) {
    return <p>Loading...</p>
  }
  const [updateProfile] = useMutation(UPDATE_PROFILE)

  let lastLogin
  let currentLogin
  let lastDay

  //update user email, useEffect, so this only happens once
  useEffect(() => {
    if (
      currentUser?.profile?.email == null &&
      currentUser?.profile?.id &&
      userMetadata?.email &&
      isAuthenticated
    ) {
      updateProfile({
        variables: {
          id: currentUser?.profile?.id,
          input: { 
            email: userMetadata?.email,  
          },
        },
      })
    }
    else if (isAuthenticated && currentUser){
      currentLogin = new Date()
      lastLogin = new Date(Date.parse(currentUser?.profile?.lastLogin))
      lastDay = new Date(Date.parse(currentUser?.profile?.lastDay))
      console.log(typeof lastDay)

      let diff = currentLogin - lastLogin // result in ms

      let streak;
      if (diff > 86400000) {
        //last login more than a day ago, reset streak
        streak = 1
        lastDay = currentLogin
      } 
      else if (currentLogin.getDate() !== lastLogin.getDate()){
        //otherwise if it's a different date increment the streak
        streak = currentUser?.profile?.currentStreak + 1
        lastDay = currentLogin
      }
      else {
        lastDay = currentUser?.profile?.lastDay
      }

      updateProfile({
        variables: {
            id: currentUser?.profile?.id,
            input: { 
              email: userMetadata?.email,
              lastLogin: new Date(),
              lastDay: lastDay,
              streak: streak,
            },
        }
      })
    }

  }, [currentUser, isAuthenticated, userMetadata, updateProfile])

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
