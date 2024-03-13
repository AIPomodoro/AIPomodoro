import { useState } from 'react'

import { Form, Label, Submit, CheckboxField } from '@redwoodjs/forms'

const SettingsModal = ({ isOpen, onClose, settings }) => {
  const [soundEnabled, setSoundEnabled] = useState(settings.soundEnabled)
  if (!isOpen) return null

  const handleSubmit = (data) => {
    onClose(data)
  }

  const handleSoundEnabledChange = () => setSoundEnabled(!soundEnabled)

  return (
    <div className="left-0, fixed top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-md bg-white p-8">
        <h2>Settings</h2>
        <hr></hr>
        <Form onSubmit={handleSubmit}>
          <Label className="me-2" htmlFor="soundEnabled">
            Enable Sound
          </Label>
          <CheckboxField
            name="soundEnabled"
            checked={soundEnabled}
            onChange={handleSoundEnabledChange}
          />
          <br />
          <Submit>Save</Submit>
        </Form>
      </div>
    </div>
  )
}

export default SettingsModal
