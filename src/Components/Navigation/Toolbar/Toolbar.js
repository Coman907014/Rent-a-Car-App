import React from 'react';
import NavigationItems from '../NavigationItems';
import classes from './Toolbar.module.css';

const Toolbar = (props) => (
    <div className={`${classes.Toolbar} ${ props.isLoggedIn ? '' : classes.ToolbarLogged}` }>
        <img src="https://st2.depositphotos.com/2703645/11876/v/950/depositphotos_118767294-stock-illustration-rent-a-car-logo.jpg" className={classes.Logo} alt="Logo" />
        <h2>Aixam Rent a Car</h2>
        <NavigationItems login={props.login} register={props.register} logout={props.userLogOut} adminLogin={props.adminLogin} adminLogout={props.adminLogout}/>
    </div>
);

export default Toolbar;