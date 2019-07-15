import React from 'react';
import classes from './Benefits.module.css';
import car from '../../../../assets/images/car.png';
import locations from '../../../../assets/images/locations.png';
import trust from '../../../../assets/images/trust.png';
import shuttle from '../../../../assets/images/shuttle.png';

const Benefits = () => (
    <div>
        <div className={classes.Benefits}>
            <img className={classes.BenefitsImage} src={trust} alt='trust' />
            <h3 className={classes.BenefitsText}>O companie de incredere</h3>
        </div>
        <div className={classes.Benefits}>
            <img className={classes.BenefitsImage} src={locations} alt='locations' />
            <h3 className={classes.BenefitsText}>Locatii multiple</h3>
        </div>
        <div className={classes.Benefits}>
            <img className={classes.BenefitsImage} src={car} alt='car' />
            <h3 className={classes.BenefitsText}>Parc auto diversificat</h3>
        </div>
        <div className={classes.Benefits}>
            <img className={classes.BenefitsImage} src={shuttle} alt='shuttle service' />
            <h3 className={classes.BenefitsText}>Shuttle service</h3>
        </div>
        <div className={classes.CompanyMission}>
            <h1>Un automobil premium pentru fiecare sofer!</h1>
        </div>

    </div>
);

export default Benefits;