import { useState } from "react";
import { createAuthUserWithEmailPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils";
const defaultFormFields = {
    displayName:"",
    email:"",
    password:"",
    confirmPassword:""
}
const SignUpForm = ()=>{


    const [Formfields,setFormfields] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} = Formfields;
    console.log(Formfields)
    const onInputChange = (event)=>{
       const {name,value} = event.target;
       setFormfields({...Formfields,[name]:value});
    }
    const resetFormFields = ()=>{
        setFormfields(defaultFormFields);
    }
    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(password === confirmPassword){
            try{
                const {user} = await createAuthUserWithEmailPassword(email,password);
                await createUserDocumentFromAuth(user,{displayName});
                resetFormFields();
            }catch(err){
                if(err.code === "auth/email-already-in-use"){
                    alert("user already exists with this email")
                }else{
                    console.log(err);
                }
            }
        }else{
            alert("Password and Confirm password does not match");
            return;
        }
    }
    return(
        <div>
            <h1>Sign Uo form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Display name </label>
                <input type="text" required value={displayName} name="displayName" onChange={onInputChange}/>
                <label htmlFor="">Email </label>
                <input type="email" required  value={email} name="email"onChange={onInputChange}/>
                <label htmlFor="">Password</label>
                <input type="password" required value={password} name="password" onChange={onInputChange}/>
                <label htmlFor="">Confirm passworn </label>
                <input type="password" required value={confirmPassword} name="confirmPassword" onChange={onInputChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignUpForm;