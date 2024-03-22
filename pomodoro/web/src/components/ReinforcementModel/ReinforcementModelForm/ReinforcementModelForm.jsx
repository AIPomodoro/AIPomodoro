import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const ReinforcementModelForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.reinforcementModel?.id)
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
          defaultValue={props.reinforcementModel?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="modelData"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Model data
        </Label>

        <TextField
          name="modelData"
          defaultValue={props.reinforcementModel?.modelData}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="modelData" className="rw-field-error" />

        <Label
          name="rating"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rating
        </Label>

        <NumberField
          name="rating"
          defaultValue={props.reinforcementModel?.rating}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="rating" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ReinforcementModelForm
