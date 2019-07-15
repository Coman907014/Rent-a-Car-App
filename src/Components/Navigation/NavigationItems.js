import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import AuthContext from '../../context/context';

const NavigationItems = (props) => {
    const navigationButtons =
        <ul className={classes.NavigationItems}>
            <NavigationItem clicked={props.login}>Login</NavigationItem>
            <NavigationItem clicked={props.register}>Register</NavigationItem>
        </ul>;
    const logoutButton =
        <ul className={classes.NavigationItems}>
            <NavigationItem
            clicked={props.logout}>Logout</NavigationItem>
            <NavigationItem
            admin
            className={classes.NavigationItems}
            clicked={props.adminLogin}>Admin</NavigationItem>
        </ul>;
    
    const logoutAdminButton =
        <ul className={classes.NavigationItems}>
            <NavigationItem
            clicked={props.logout}>Logout</NavigationItem>
        </ul>;

    return (
        <span>
            <AuthContext.Consumer>
                {(context) => !context.authenticated ? navigationButtons : context.isAdmin ? logoutAdminButton : logoutButton}
            </AuthContext.Consumer>
        </span>
    );
};

export default NavigationItems;
