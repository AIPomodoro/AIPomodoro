import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

const ProfileForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.profile?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.profile?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="workDuration"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Work duration
        </Label>

        <NumberField
          name="workDuration"
          defaultValue={props.profile?.workDuration}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="workDuration" className="rw-field-error" />

        <Label
          name="breakDuration"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Break duration
        </Label>

        <NumberField
          name="breakDuration"
          defaultValue={props.profile?.breakDuration}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="breakDuration" className="rw-field-error" />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>

        <TextField
          name="email"
          defaultValue={props.profile?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="email" className="rw-field-error" />

        <Label
          name="firstName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          First name
        </Label>

        <TextField
          name="firstName"
          defaultValue={props.profile?.firstName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="firstName" className="rw-field-error" />

        <Label
          name="lastName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Last name
        </Label>

        <TextField
          name="lastName"
          defaultValue={props.profile?.lastName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="lastName" className="rw-field-error" />

        <Label
          name="phone"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Phone
        </Label>

        <TextField
          name="phone"
          defaultValue={props.profile?.phone}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="phone" className="rw-field-error" />

        <Label
          name="currentStreak"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Current streak
        </Label>

        <NumberField
          name="currentStreak"
          defaultValue={props.profile?.currentStreak}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="currentStreak" className="rw-field-error" />

        <Label
          name="soundEnabled"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Sound enabled
        </Label>

        <CheckboxField
          name="soundEnabled"
          defaultChecked={props.profile?.soundEnabled}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="soundEnabled" className="rw-field-error" />

        <Label
          name="autoStart"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Auto start
        </Label>

        <CheckboxField
          name="autoStart"
          defaultChecked={props.profile?.autoStart}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="autoStart" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ProfileForm
