import React from "react";
import Alert from "./Alert";
import "./Form.css";

const Form = () => {
  const [value, setValue] = React.useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [errors, setError] = React.useState({});
  const [success, setSuccess] = React.useState(false);

  const validateForm = () => {
    const errors = {};

    if (value.name.length === 0) {
      errors.name = "Name is rquired!";
    } else if (value.name.length <= 2) {
      errors.name = "Name must be more that 2 characters!";
    }

    if (value.lastname.length === 0) {
      errors.lastname = "Lastname is rquired!";
    } else if (value.lastname.length <= 2) {
      errors.lastname = "Lastname must be more that 2 characters!";
    }

    if (value.email.length === 0) {
      errors.email = "Email is rquired!";
    } else if (
      !value.email.match(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
      )
    ) {
      errors.email = "This is not a valid email!";
    }

    if (
      !value.password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
      )
    ) {
      errors.password =
        "Password must contain at least one lowercase letter, one uppercase letter, one number and at least 8 characters!";
    } else if (value.password !== value.repeatPassword) {
      errors.password = "Passwords must be equal!";
    }

    if (value.repeatPassword.length === 0) {
      errors.repeatPassword = "You must repeat password!";
    } else if (value.repeatPassword !== value.password) {
      errors.repeatPassword = "Passwords must be equal!";
    }
    return errors;
  };

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
    let allErrors = errors;
    delete allErrors[event.target.name];
    setError(allErrors);
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errorsObj = validateForm();
    setError(errorsObj);
    if (Object.keys(errorsObj).length === 0) {
      setSuccess(true);
    }
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Sign up</h1>
        <div className="line"></div>
        <form onSubmit={handleSubmit}>
          {success && (
            <Alert
              type="success"
              message="The form is successfully submited!"
            />
          )}
          <div style={{ width: "100%" }}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              onChange={handleChange}
            />
            {errors?.name && <Alert type="error" message={errors.name} />}
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Lastname"
              onChange={handleChange}
            />
            {errors?.lastname && (
              <Alert type="error" message={errors.lastname} />
            )}
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            {errors?.email && <Alert type="error" message={errors.email} />}
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            {errors?.password && (
              <Alert type="error" message={errors.password} />
            )}
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Repeat password"
              onChange={handleChange}
            />
            {errors?.repeatPassword && (
              <Alert type="error" message={errors.repeatPassword} />
            )}
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Form;
