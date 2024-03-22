import { useState } from 'react'

import { Metadata } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Navbar from 'src/components/Navbar'
import Timer from 'src/components/Timer/Timer'

const UPDATE_PROFILE_SETTINGS = gql`
  mutation UpdateProfileMutation($id: Int!, $input: UpdateProfileInput!) {
    updateProfile(id: $id, input: $input) {
      soundEnabled
      autoStart
    }
  }
`

//this is hacky as fuck
const UPDATE_RLModel = gql`
  mutation UpdateRatingMutation($id: Int!, $input: UpdateReinforcementModelInput!) {
    updateReinforcementModel(id: $id, input: $input) {
      rating
    }
  }
`

const DashPage = () => {
  const { currentUser, loading } = useAuth()

  if (loading) return <p>Loading...</p>

  const defaultSettings = {
    soundEnabled: currentUser?.profile?.soundEnabled || true,
    autoStart: currentUser?.profile?.autoStart || false,
  }

  const [updateSettings] = useMutation(UPDATE_PROFILE_SETTINGS)
  const [updateRating] = useMutation(UPDATE_RLModel)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [settings, setSettings] = useState(defaultSettings)
  const [isRatingOpen, setIsRatingOpen] = useState(false)

  //Navbar State
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  //save new settings
  const saveSettings = (data) => {
    updateSettings({
      variables: {
        id: currentUser?.profile?.id,
        input: {
          soundEnabled: data.soundEnabled,
          autoStart: data.autoStart,
        },
      },
    })
    console.log(data)
    setSettings(data)
  }

  //open and close settings modal
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  const openRating = () => {
    setIsRatingOpen(true)
  }
  const handleRating = (rating) => {
    //no fucking clue if this works
    updateRating({
      variables: {
        id: currentUser?.profile?.modelId,
        input: {
          rating: rating,
        },
      }
    })
    console.log(rating)
    setIsRatingOpen(false)
  }

  return (
    <div>
      <Metadata title="Dash" description="Dash page" />

      <Navbar
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
        isSettingsOpen={isSettingsOpen}
        toggleSettings={toggleSettings}
        saveSettings={saveSettings}
        settings={settings}
      />

      <div className="flex h-48 justify-center">
        <Timer
          settings={settings}
          isRatingOpen={isRatingOpen}
          openRating={openRating}
          handleRating={handleRating}
        />
      </div>
    </div>
  )
}

export default DashPage
