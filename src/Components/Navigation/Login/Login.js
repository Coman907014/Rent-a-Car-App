import React from 'react';
import classes from './Login.module.css';

const Login = (props) => {
    const error =
        props.error ? 'The email needs to contain an \'@\' .'
            : props.resetMessage ? 'Please, fill in the e-mail address, then click on \'Reset Password\' again. The password will be received on the specified email.'
                : null;

    const password =
        !props.resetMessage &&
        <div><label className={classes.Label} >Password</label>
            <input type='password' name="password" className={classes.Input} autoComplete="Off" placeholder='Password' minLength="8" onChange={props.inputPassword} />
        </div>;

    const loginButton =
        props.resetMessage
            ? <div className={classes.RegisterButton} onClick={props.resetPassword}>Reset Password</div>
            : <div className={classes.RegisterButton} onClick={props.loginUser}>Login</div>;

    return (
        <form>
            <h3>
                Please login.
            </h3>
            <p>{error}</p>
            <label className={classes.Label}>Email</label>
            <input type='email' name="email" className={classes.Input} placeholder='Email' onChange={props.emailCheck} />
            {password}
            <p onClick={props.resetPass} className={classes.ResetPass}>Forgot Password?</p>
            {loginButton}
            <div className={classes.CancelButton} onClick={props.cancelLogin}>Cancel</div>
        </form>
    );
};

export default Login;



