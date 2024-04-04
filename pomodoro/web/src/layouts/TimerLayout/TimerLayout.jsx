import { useEffect, useState } from 'react'

import { useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import Navbar from 'src/components/Navbar'

<<<<<<< HEAD
=======
import bell from '../../../assets/bell.wav'
import JournalModalCell from 'src/components/JournalModalCell/JournalModalCell'

>>>>>>> a8ab851ee11372eec343e4b77f249d94d1bdd602
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

  const [isJournalOpen, setIsJournalOpen] = useState(false);

  const toggleJournalModal = () => {
    setIsJournalOpen(!isJournalOpen);
  };
  return (
    <>
      <Toaster />
<<<<<<< HEAD
      <Navbar />
      <main>{children}</main>
=======
      <TimerContext.Provider
        value={{
          isSettingsOpen,
          setIsSettingsOpen,
          isNavMenuOpen,
          setIsNavMenuOpen,
          isBreak,
          setIsBreak,
          isRunning,
          setIsRunning,
          isRatingOpen,
          setIsRatingOpen,
          handleRating,
          settings,
          setSettings,
          saveSettings,
          time,
          setTime,
          resetTimer,
          soundEnabled,
          setSoundEnabled,
          autoStart,
          setAutoStart,
        }}
      >
        <Navbar onJournalButtonClick={toggleJournalModal} />
        {isJournalOpen && <JournalModalCell onClose={toggleJournalModal} />}
        <main>{children}</main>
      </TimerContext.Provider>
>>>>>>> a8ab851ee11372eec343e4b77f249d94d1bdd602
    </>
  )
}
export default TimerLayout
