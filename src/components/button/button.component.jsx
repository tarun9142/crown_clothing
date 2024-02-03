import {BaseButton, GoogleSIgnInButton, InvertedButton} from  "./button.styles.jsx"


export const BUTTON_TYPES = {
  google: "GoogleSIgnInButton",
  inverted: "InvertedButton",
  base: "BaseButton"
}

const BUTTONS = {
  GoogleSIgnInButton : GoogleSIgnInButton,
  InvertedButton: InvertedButton,
  BaseButton: BaseButton
}

const Button = ({ children, buttonType=BUTTON_TYPES.base, ...otherProps }) => {
  let CustomButton = BUTTONS[buttonType]?BUTTONS[buttonType]:BUTTONS.BaseButton
  
  return(
    <CustomButton {...otherProps}>{children}</CustomButton>
  )}

export default Button;