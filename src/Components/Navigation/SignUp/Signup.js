import React from 'react';
import classes from './Signup.module.css';

const Signup = (props) => {
    const error =
        props.element
            ? `The ${props.element} ${props.element === 'Email' ? 'needs to contain an \'@\'.' : 'needs to have a length of at least 5 characters'}`
            : props.passConfirmationError ? 'The passwords don\'t match!'
                : props.signUpSuccess ? 'Welcome to Aixam Rent a Car, your account is created. Now, go on and rent your first car.'
                    : props.signUpFailure ? 'Something went haywire! Please, try again.'
                        : null;
    return (
        <form>
            <h3>Please, create your account.</h3>
            <p>{error ? error : ''}</p>
            <input type='text' name="firstName" className={classes.Input} placeholder='First Name' onChange={props.formCheck} />
            <div>
                <input type='text' name="secondName" className={classes.Input} placeholder='Second Name' onChange={props.formCheck} />
            </div>
            <input type='email' name="email" className={classes.Input} onChange={props.formCheck} placeholder='Email' />
            <input type='password' className={classes.Input} autoComplete="Off" placeholder='Password' minLength="8" onChange={props.createPass} />
            <input type='password' className={classes.Input} autoComplete="Off" placeholder='Confirm Password' minLength="8" onChange={props.confirmPassword} />
            <div className={classes.SignupButton} onClick={props.signUp}>Sign up</div>
            <div className={classes.CancelButton} onClick={props.cancelSignup}>Cancel</div>
        </form>

    );
};

export default Signup;