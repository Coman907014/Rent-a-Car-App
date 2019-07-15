
import React, { Component } from 'react';
import classes from './Car.module.css';

class Car extends Component {
    state = {
        isEditInProcess: false,
    };

    editCarHandler = () => {
        this.setState({ isEditInProcess: !this.state.isEditInProcess })
    }

    render() {
        const reserveCar =
            this.props.isLoggedIn &&
            <div className={classes.ReserveButton} onClick={this.props.reserveTheCar} data-key={this.props.carId}>Reserve Car</div>;

        const adminView =
            this.props.adminView &&
            <div>
                {this.state.isEditInProcess
                    ? <div>
                        <div className={classes.DeleteButton} onClick={this.editCarHandler}>Cancel</div>
                        <div className={classes.SaveButton} onClick={this.props.finishCarEdit} data-key={this.props.carId}>Save</div>
                    </div>
                    : <div>
                        <div className={classes.ReserveButton} onClick={this.editCarHandler}>Edit</div>
                        <div className={classes.DeleteButton} onClick={this.props.deleteCar} data-key={this.props.carId}>Delete</div>
                    </div>}
            </div>;


        return (
            <div className={classes.Wrapper} >
                <img src={this.props.imageSource} className={classes.Image} alt={this.props.carMake} />
                <div className={classes.CarText}>
                    {!this.state.isEditInProcess
                        ? <h3>{this.props.carMake} {this.props.carModel}</h3>
                        : <div>
                            <input type='text' name="carMake" placeholder='Make' className={classes.Input} onChange={this.props.editInput} defaultValue={this.props.carMake} />
                            <input type='text' name="carModel" className={classes.Input} placeholder='Model' onChange={this.props.editInput} defaultValue={this.props.carModel} />
                        </div>}
                    <p><i>Starting from</i></p>
                    {
                        !this.state.isEditInProcess
                            ? <p>{this.props.carPrice}</p>
                            : <input type='text' name="carPrice"
                                className={classes.Input}
                                placeholder='Daily Price'
                                onChange={this.props.editInput}
                                defaultValue={this.props.carPrice} />
                    }
                    {reserveCar} {adminView}
                </div>
            </div>
        );
    }
};


export default Car;