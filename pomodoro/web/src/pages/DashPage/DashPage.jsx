import { useState } from 'react'

import { Metadata } from '@redwoodjs/web'

import Navbar from 'src/components/Navbar'
import Timer from 'src/components/Timer/Timer'

const DashPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [settings, setSettings] = useState({ soundEnabled: true })

  //Navbar State
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  //save new settings
  const saveSettings = (data) => {
    setSettings(data)
  }

  //open and close settings modal
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen)
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
        <Timer settings={settings} />
      </div>
    </div>
  )
}

export default DashPage
