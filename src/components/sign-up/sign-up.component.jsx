import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

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
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={submitHandler}>
                <label>Display Name</label>
                <input type="text" onChange={handleChange} name='displayName' value={displayName} required/>

                <label>Email</label>
                <input type="email" onChange={handleChange} name='email' value={email} required/>

                <label>Password</label>
                <input type="password" onChange={handleChange} name='password' value={password} required/>

                <label>Confirm Password</label>
                <input type="password" onChange={handleChange} name='confirmPassword' value={confirmPassword} required/>
                <button type="submit">SIGN UP</button>

            </form>
        </div>
    )
}

export default SignUp;