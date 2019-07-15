import React from 'react';
import classes from './NavigationItem.module.css';

const NavigationItem = (props) => (

    <ul className={`${classes.NavigationItem} ${props.admin && classes.NavigationItemAdmin}`}>
        <li
            onClick={props.clicked}
            className={classes.active}>{props.children}
        </li>
    </ul>
);

export default NavigationItem;