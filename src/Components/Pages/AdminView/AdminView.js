import React, { Component } from 'react';
import classes from './AdminView.module.css';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionTypes from '../../../store/actions';
import Cars from '../../../Containers/Cars/Cars';
import Reservations from '../../../Containers/Reservations/Reservations';

class AdminView extends Component {

    state = {
        inputCar: {
            carMake: '',
            carModel: '',
            carPrice: '',
            carImage: '',
            carId: '',
        },
        savedCars: [],
        isCarAdded: false,
    }

    carFormHandler = (event) => {
        const input = event.target.value;
        const inputType = event.currentTarget.name;
        let updatedState = { ...this.state };
        updatedState.inputCar[inputType] = input;
        this.setState({ updatedState });
    };

    addNewCarHandler = () => {
        const newCar = {
            "model": this.state.inputCar.carModel,
            "mark": this.state.inputCar.carMake,
            "price": this.state.inputCar.carPrice,
            "image": this.state.inputCar.carImage
        }
        axios.post(`http://localhost:5000/cars`, newCar, {
            headers: {
                'x-auth-token': this.props.token
            }
        })
            .then(response => {
                let data = response.data;
                this.props.carIsAdded(data)
            })
            .catch(error => (
                console.log('No car was created!', error)
            ))
        let updatedState = { ...this.state };
        updatedState.inputCar.carModel = ''
        updatedState.inputCar.carMake = ''
        updatedState.inputCar.carPrice = ''
        updatedState.inputCar.carImage = ''
        this.setState({ updatedState, isCarAdded: true })
    };

    finishEditHandler = (event) => {
        const carId = event.target.dataset.key;
        let mark, model, price;
        const { inputCar: { carPrice } } = this.state;
        if (this.state.inputCar.carMake) { mark = this.state.inputCar.carMake };
        if (this.state.inputCar.carModel) { model = this.state.inputCar.carModel };
        if (this.state.inputCar.carPrice) { price = carPrice.split('E').splice(0, 1).toString() };
        const editedCar = {
            mark,
            model,
            price,
        };
        axios.patch(`http://localhost:5000/cars/${carId}`, editedCar, {
            headers: {
                'x-auth-token': this.props.token
            }
        })
            .then(response => {
                this.props.carIsUpdated(response.data)
            })
            .catch(error => (
                console.log('No car was created!', error)
            ))

        this.setState({
            isCarAdded: true,
            carIsBeingEdited: false,
            inputCar: {
                carModel: '',
                carMake: '',
                carPrice: '',
                carImage: '',
                carId: ''
            }
        });

    };

    editCarInputHandler = (event) => {
        let updatedState = { ...this.state }
        const inputType = event.currentTarget.name;
        updatedState.inputCar[inputType] = event.target.value
        this.setState({ updatedState })
    };

    deleteCarHandler = (event) => {
        const carId = event.target.dataset.key;
        axios.delete(`http://localhost:5000/cars/${carId}`, {
            headers: {
                'x-auth-token': this.props.token
            }
        })
            .then(response => {
                this.props.carIsDeleted(carId)
            })
            .catch(error => (
                console.log('No car was deleted!', error)
            ))
    };

    render() {

        return (
            <div>
                <div className={classes.AdminView}>
                    <form>
                        <h3 className={classes.Text}>
                            This is the cockpit of our application, sir. Think twice, click once!
                    </h3>
                        <img className={classes.AdminImage} src='https://media2.giphy.com/media/3o6MbhrvSl6FED5uBa/200.webp?cid=790b76115d272c073436446f361c0a4f&rid=200.webp' alt="Hello there!" />
                        {this.state.isCarAdded ? <h3>The car was added to your fleet!</h3> : <p>Time to modify your car fleet, it is.  </p>}
                        <input type='text' name="carMake" className={classes.Input} placeholder='Make' onChange={this.carFormHandler} value={this.state.inputCar.carMake} />
                        <input type='text' name="carModel" className={classes.Input} placeholder='Model' onChange={this.carFormHandler} value={this.state.inputCar.carModel} />
                        <input type='text' name="carPrice" className={classes.Input} placeholder='Daily Price' onChange={this.carFormHandler} value={this.state.inputCar.carPrice} />
                        <input type='text' name="carImage" className={classes.Input} placeholder='Image (link)' onChange={this.carFormHandler} value={this.state.inputCar.carImage} />
                        <div className={classes.SignupButton} onClick={this.addNewCarHandler}>Add New Car</div>
                    </form>
                </div >
                <div className={classes.CarList}>
                    <div className={classes.Car}>
                        <Cars
                            className={classes.Car}
                            adminView
                            editInput={this.editCarInputHandler}
                            finishCarEdit={this.finishEditHandler}
                            deleteCar={this.deleteCarHandler}
                        />
                    </div>
                        <Reservations />
                </div>
            </div>


        );
    }
};


const mapStateToProps = state => {
    return {
        cars: state.cars,
        token: state.token,
        reservations: state.reservations,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        carIsAdded: (addedCar) => dispatch({ type: actionTypes.ADD_CAR, newCar: addedCar }),
        carIsDeleted: (deletedCarId) => dispatch({ type: actionTypes.REMOVE_CAR, theDeletedCarId: deletedCarId }),
        carIsUpdated: (updCar) => dispatch({ type: actionTypes.UPDATE_CAR, updatedCar: updCar })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminView);
