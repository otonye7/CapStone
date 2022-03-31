import { useState } from 'react';
import Button from '../button/button.component';
import { signInWithGooglePopUp, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-inputs/form-inputs.component';
import './sign-in.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignIn = () => {
    const [formFields, setFormField] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormField(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopUp();
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormField({...formFields, [name]: value})
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password)
            resetFormFields()
        } catch(err){
            console.log(err);
        }
    }

    return(
        <div className='sign-up-container'>
            <h2>Already have an account ? </h2>
            <span>Sign In</span>
            <form onSubmit={submitHandler}>

                <FormInput label="Email" type="email" onChange={handleChange} name='email' value={email} required/>

                <FormInput label="Password" type="password" onChange={handleChange} name='password' value={password} required/>
                 <div className='buttons-container'>
                     <Button type="submit">SIGN IN</Button>
                     <Button type='button' buttonType='google' onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
                 </div>
            </form>
        </div>
    )
}

export default SignIn;