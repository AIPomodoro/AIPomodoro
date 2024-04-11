import { useState, useEffect, createContext, useContext } from 'react'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

import bell from '../../../assets/bell.wav'

const TimerContext = createContext()

const useTimerContext = () => useContext(TimerContext)

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

const TimerContextProvider = ({ children }) => {
  const { isAuthenticated, currentUser, loading } = useAuth()

  if (loading) {
    return <p>Loading...</p>
  }
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isRatingOpen, setIsRatingOpen] = useState(false)
  const defaultSettings = {
    soundEnabled: currentUser?.profile?.soundEnabled || true,
    autoStart: currentUser?.profile?.autoStart || false,
    workDuration: currentUser?.profile?.workDuration || 1500,
    breakDuration: currentUser?.profile?.breakDuration || 300,
  }
  const [settings, setSettings] = useState(defaultSettings)
  const [soundEnabled, setSoundEnabled] = useState(settings.soundEnabled)
  const [autoStart, setAutoStart] = useState(settings.autoStart)
  const [time, setTime] = useState(defaultSettings.workDuration)
  const [updateProfileSettings] = useMutation(UPDATE_PROFILE_SETTINGS)

  const handleRating = (rating) => {
    //TODO do rating submit stuff,
    //not currently used anywhere
    console.log(rating)
    setIsRatingOpen(false)
  }

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

  const resetTimer = () => {
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
      data.breakDuration = settings.breakDuration
    }
    setSettings(data)
    setIsRunning(false)
    if (isBreak && data.breakDuration) {
      setTime(data.breakDuration)
    } else if (data.workDuration) {
      setTime(data.workDuration)
    }
    updateProfileSettings({
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
  }

  return (
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
      {children}
    </TimerContext.Provider>
  )
}
export { TimerContext, TimerContextProvider, useTimerContext }
