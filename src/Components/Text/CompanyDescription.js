import React from 'react';
import classes from './CompanyDescription.module.css';

const CompanyDescription = (props) => {
    const text =
        !props.userIsLogged
            ? <div className={classes.CompanyDescription}>
                <h2>Aixam Rent a Car</h2>
                <p>Aixam Rent a Car Napoca este o firma de inchirieri auto ce ofera masini de inchiriat Cluj la cele mai avantajoase preturi.</p>
                <p>Oferta Aixam Rent a Car cuprinde servicii de inchirieri masini cu sofer Cluj sau fara sofer, cu livrare gratuita la Aeroportul International Cluj Napoca.</p>
            </div>
            : <div className={classes.CompanyDescriptionLogged}>
                <h2>Hello, dear friend!</h2>
                <p>Now, that you are logged in, you can make your reservation.</p>
                <p>We hope our services will be suitable for you</p>
                <img className={classes.HelloImage} src="https://static1.squarespace.com/static/59a76cda03596e127d16f1f4/t/59a76df3e6f2e1cdbf36be12/1542322072949/?format=1500w" alt='Hello' />
            </div>;

    return (
        <div>
            {text}
        </div>
    );
};

export default CompanyDescription;