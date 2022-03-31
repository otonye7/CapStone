import { useState, useContext } from 'react';
import Button from '../button/button.component';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-inputs/form-inputs.component';
import './sign-up.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUp = () => {
    const [formFields, setFormField] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
 
    const resetFormFields = () => {
        setFormField(defaultFormFields)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormField({...formFields, [name]: value})
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Password do not match");
            return
        }
        try{
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields()
        } catch(err){
            if(err.code === 'auth/email-already-in-use'){
                alert("Cannot create user. Email already in use")
            }
        }
    }

    return(
        <div className='sign-up-container'>
            <h2>Don't have an account ? </h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={submitHandler}>
                <FormInput label="Display Name" type="text" onChange={handleChange} name='displayName' value={displayName} required/>

                <FormInput label="Email" type="email" onChange={handleChange} name='email' value={email} required/>

                <FormInput label="Password" type="password" onChange={handleChange} name='password' value={password} required/>

                <FormInput label="Confirm Password" type="password" onChange={handleChange} name='confirmPassword' value={confirmPassword} required/>
                
                <Button type="submit">SIGN UP</Button>

            </form>
        </div>
    )
}

export default SignUp;