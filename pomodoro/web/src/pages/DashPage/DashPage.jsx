import { useState, useEffect } from 'react'

import { Metadata } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import Navbar from 'src/components/Navbar'
import RatingModal from 'src/components/RatingModal/RatingModal'
import Timer from 'src/components/Timer/Timer'
import { useTimerContext } from 'src/layouts/TimerLayout'

import bell from '../../../assets/bell.wav'

const UPDATE_PROFILE_SETTINGS = gql`
  mutation UpdateProfileMutation($id: Int!, $input: UpdateProfileInput!) {
    updateProfile(id: $id, input: $input) {
      soundEnabled
      autoStart
      workDuration
      breakDuration
    }
  }
`

const DashPage = ({ test }) => {
  const { currentUser, loading } = useAuth()
  if (loading) return <p>Loading...</p>

  const defaultSettings = {
    soundEnabled: currentUser?.profile?.soundEnabled || true,
    autoStart: currentUser?.profile?.autoStart || false,
    workDuration: currentUser?.profile?.workDuration || 1500,
    breakDuration: currentUser?.profile?.breakDuration || 300,
  }

  const [updateSettings] = useMutation(UPDATE_PROFILE_SETTINGS)
  //const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  //TESTING

  const [isRatingOpen, setIsRatingOpen] = useState(false)
  const [settings, setSettings] = useState(defaultSettings)

  const [isBreak, setIsBreak] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(defaultSettings.workDuration)

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        if (time > 0) {
          setTime((time) => time - 1)
          if (time === 1 && settings.soundEnabled) new Audio(bell).play()
        } else if (time === 0) {
          /* flip time to the opposite after timer is done */
          let newTime = isBreak ? settings.workDuration : settings.breakDuration
          if (!settings.autoStart) {
            if (!isBreak) setIsRatingOpen(true)
            setIsRunning(false)
          }
          setIsBreak(!isBreak)
          setTime(newTime)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [time, isRunning, isBreak, settings])

  const reset = () => {
    let newTime = isBreak ? settings.breakDuration : settings.workDuration
    setTime(newTime)
    setIsRunning(false)
  }

  //save new settings
  const saveSettings = (data) => {
    if (data.workDuration) {
      data.workDuration *= 60
    } else {
      data.workDuration = settings.workDuration
    }

    if (data.breakDuration) {
      data.breakDuration *= 60
    } else {
      data.breakDuration *= settings.breakDuration
    }

    updateSettings({
      variables: {
        id: currentUser?.profile?.id,
        input: {
          soundEnabled: data.soundEnabled,
          autoStart: data.autoStart,
          workDuration: data.workDuration,
          breakDuration: data.breakDuration,
        },
      },
    })
    toast('Saved!')

    setSettings(data)

    setIsRunning(false)
    if (isBreak && data.breakDuration) {
      setTime(data.breakDuration)
    } else if (data.workDuration) {
      setTime(data.workDuration)
    }
  }

  const toggleRunning = () => {
    setIsRunning(!isRunning)
  }

  const handleRating = (rating) => {
    //TODO do rating submit stuff
    console.log(rating)
    setIsRatingOpen(false)
  }

  return (
    <>
      <h1>{test}</h1>
      <Toaster />
      <div>
        <Metadata title="Dash" description="Dash page" />

        <Navbar saveSettings={saveSettings} settings={settings} />

        <div className="flex h-48 justify-center">
          <Timer
            time={time}
            isRunning={isRunning}
            toggleRunning={toggleRunning}
            isBreak={isBreak}
            reset={reset}
          />
        </div>
      </div>
      <RatingModal isOpen={isRatingOpen} handleRating={handleRating} />
    </>
  )
}

export default DashPage
