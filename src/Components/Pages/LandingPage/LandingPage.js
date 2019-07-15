import React from 'react';
import classes from './LandingPage.module.css';
import CompanyDescription from '../../Text/CompanyDescription';
import Cars from '../../../Containers/Cars/Cars';
import Benefits from './Benefits/Benefits';

const LandingPage = (props) => {
    const information = props.isLoggedIn
        ? (<div className={classes.CarList}>
            <h3>Choose the car you wish to rent!</h3>
            <Cars isLoggedIn={props.isLoggedIn} userToken={props.userToken} />
        </div>)
        : <Benefits />;
    return (
        <div>
            <div className={classes.CompanyDescription}>
                <CompanyDescription userIsLogged={props.isLoggedIn} />
            </div>
            <div className={classes.MainContent}>
             {!props.isLoggedIn &&  <img className={classes.MainImage} src="https://www.runyourfleet.com/wp-content/uploads/2015/03/alphabet_stage_uk_19-_1.jpg" alt='Fleet Presentation' />}
                {information}
            </div>
        </div>
    );
};

export default LandingPage;