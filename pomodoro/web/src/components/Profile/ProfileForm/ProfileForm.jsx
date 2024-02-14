import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
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
