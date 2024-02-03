import { useState } from "react";
import {
  signInUserWithEmailPassword,
  signinWithGooglePopup
} from "../../utils/firebase.utils";

import "./sign-in-form.styles.scss"
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPES } from "../button/button.component";
const defaultFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [Formfields, setFormfields] = useState(defaultFormFields);
  const { email, password } = Formfields;

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormfields({ ...Formfields, [name]: value });
  };
 
  const resetFormFields = () => {
    setFormfields(defaultFormFields);
  };

  const signinWithGoogle = async ()=>{
    await signinWithGooglePopup();
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
      try {
        await signInUserWithEmailPassword(email,password);
        resetFormFields();
      } catch (err) {
        switch(err.code){
          case 'auth/too-many-requests':
            alert('Too many tries. Please try again after some time');
            break;
          case 'auth/invalid-login-credentials':
            alert('Incorrect Username/Password');
            break;
          default:
            console.log(err);
        }
      }
  };
  return (
    <div className="sign-in-container">
      <h1>Already have an account?</h1>
      <span>Sign In using Email and Password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button  type="submit">Sign In</Button>
          <Button type="button" buttonType={BUTTON_TYPES.google} onClick={signinWithGoogle}>google sign in</Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
