import React from "react";
import { Field, reduxForm } from "redux-form";

function StreamForm(props: any): JSX.Element {
  const renderError = ({ error, touched }: any) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };
  const renderInput = ({ input, label, meta }: any) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {renderError(meta)}
      </div>
    );
  };

  return (
    <form
      onSubmit={props.handleSubmit(props.onSubmit)}
      className="ui form error"
    >
      <Field name="title" component={renderInput} label="Enter Title" />
      <Field
        name="description"
        component={renderInput}
        label="Enter Description"
      />
      <button className="ui button primary">Submit</button>
    </form>
  );
}

const validate = (formValues: any) => {
  const errors = { title: "", description: "" };
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);
