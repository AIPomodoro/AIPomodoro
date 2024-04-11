import {
  Form,
  Label,
  Submit,
  CheckboxField,
  NumberField,
  FieldError,
} from '@redwoodjs/forms'

import { useTimerContext } from 'src/providers/contexts/TimerContext'

const SettingsModal = () => {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    saveSettings,
    soundEnabled,
    setSoundEnabled,
    autoStart,
    setAutoStart,
  } = useTimerContext()

  if (!isSettingsOpen) return null

  const handleSubmit = (data) => {
    saveSettings(data)
    setIsSettingsOpen(false)
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
            className="mb-4"
          />
          <br />

          <Label className="me-2" htmlFor="autoStart">
            Auto Start
          </Label>
          <CheckboxField
            name="autoStart"
            checked={autoStart}
            onChange={handleAutoStartChange}
            className="mb-4"
          />
          <br />

          <Label htmlFor="workDuration" className="me-2">
            Pomodoro:
          </Label>
          <NumberField
            name="workDuration"
            className="right-0 rounded-md border-2 border-black"
            validation={{ min: 1, max: 9999 }}
          />
          <br />
          <FieldError name="workDuration" className="error" />
          <br />
          <Label htmlFor="breakDuration" className="me-2">
            Break:
          </Label>
          <NumberField
            name="breakDuration"
            className="rounded-md border-2 border-black"
            validation={{ min: 1, max: 9999 }}
          />
          <br />
          <FieldError name="breakDuration" className="error" />
          <br />
          <div className="flex justify-between">
            <Submit>Save</Submit>
            <button onClick={() => setIsSettingsOpen(false)}>Cancel</button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default SettingsModal
