import { useState } from 'react'

import {
  Form,
  Label,
  Submit,
  CheckboxField,
  NumberField,
  FieldError,
} from '@redwoodjs/forms'

const SettingsModal = ({ isOpen, onClose, settings }) => {
  const [soundEnabled, setSoundEnabled] = useState(settings.soundEnabled)
  const [autoStart, setAutoStart] = useState(settings.autoStart)
  if (!isOpen) return null

  const handleSubmit = (data) => {
    onClose(data)
  }

  const handleSoundEnabledChange = () => setSoundEnabled(!soundEnabled)
  const handleAutoStartChange = () => setAutoStart(!autoStart)

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
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

          <Label className="me-2" htmlFor="autoStart">
            Auto Start
          </Label>
          <CheckboxField
            name="autoStart"
            checked={autoStart}
            onChange={handleAutoStartChange}
          />
          <br />
          <hr />
          <Label htmlFor="workDuration" className="me-2">
            Pomodoro:
          </Label>
          <div name="workDuration">
            <Label htmlFor="workSeconds" className="me-2">
              Minutes:
            </Label>
            <NumberField
              name="workMinutes"
              className="right-0 rounded-md border-2 border-black"
              validation={{
                required: true,
                min: 0,
                max: 9999,
              }}
            />
          </div>

          <br />
          <FieldError name="workMinutes" className="error" />
          <br />

          <Label htmlFor="breakDuration" className="me-2">
            Break:
          </Label>
          <NumberField
            name="breakDuration"
            className="rounded-md border-2 border-black"
            validation={{ required: true }}
          />
          <br />
          <FieldError name="breakDuration" className="error" />
          <br />
          <Submit>Save</Submit>
        </Form>
      </div>
    </div>
  )
}

export default SettingsModal
