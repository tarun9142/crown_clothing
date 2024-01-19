import { useState } from "react";
import {
  createAuthUserWithEmailPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase.utils";

import "./sign-up-form.styles.scss"
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [Formfields, setFormfields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = Formfields;
  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormfields({ ...Formfields, [name]: value });
  };
  const resetFormFields = () => {
    setFormfields(defaultFormFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      try {
        const { user } = await createAuthUserWithEmailPassword(email, password);
        await createUserDocumentFromAuth(user, { displayName });
        resetFormFields();
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          alert("user already exists with this email");
        } else {
          console.log(err);
        }
      }
    } else {
      alert("Password and Confirm password does not match");
      return;
    }
  };
  return (
    <div className="sign-up-container">
      <h1>Don't have an account?</h1>
      <span>Sign Up using Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          value={displayName}
          name="displayName"
          onChange={onInputChange}
        />
        <FormInput
          label="Email"
          type="email"
          required
          value={email}
          name="email"
          onChange={onInputChange}
        />
        <FormInput
          label="Password"
          type="password"
          required
          value={password}
          name="password"
          onChange={onInputChange}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          required
          value={confirmPassword}
          name="confirmPassword"
          onChange={onInputChange}
        />
        <Button  type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
