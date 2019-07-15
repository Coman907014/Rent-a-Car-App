import React from 'react';
import classes from './AdminLogin.module.css';


const CarManipulation = (props) => {
    const inputManipulator =
        !props.adminIsLoggedIn &&
            <form>
                <h3>
                    Login you shall, before making a call!
                </h3>
                <img className={classes.Image} src='https://media.giphy.com/media/l1ugfaYY9ZTQ0T1gk/100.webp' alt="Admin Yoda Login!" />
                <label className={classes.Label}>Email</label>
                <input type='email' name="email" className={classes.Input} placeholder='Email' onChange={props.userInput} />
                <input type='password' name="password" className={classes.Input} autoComplete="Off" placeholder='Password' minLength="8" onChange={props.userInput} />
                <div className={classes.SignupButton} onClick={props.loginUser}>Login</div>
                <div className={classes.CancelButton} onClick={props.cancelLogin}>Cancel</div>
            </form>;
    return (
        <div>
            {inputManipulator}
        </div>

    );
};

export default CarManipulation;