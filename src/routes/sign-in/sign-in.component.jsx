import SignUp from "../../components/sign-up/sign-up.component";
import { signInWithGooglePopUp, createUserDocumentFromAuth, auth } from "../../utils/firebase/firebase.utils"

const SignIn = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopUp();
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return(
        <div>
            <h1>SIGN IN</h1>
            <button onClick={logGoogleUser}>Sign In With Google Popup</button>
            <SignUp />
        </div>
    )
}

export default SignIn