import { signinWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        let {user} = await signinWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>sign in component</h1>
            <button onClick={logGoogleUser}>log in </button>
        </div>
    );

}

export default SignIn;