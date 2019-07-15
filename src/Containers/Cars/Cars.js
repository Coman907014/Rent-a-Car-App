import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Car from './Car/Car';
import * as actionTypes from '../../store/actions';

class Cars extends Component {
    state = {
        savedCars: [],
    };

    componentDidMount() {
        axios.get('http://localhost:5000/cars', {
            headers: {
                'x-auth-token': localStorage.getItem('userToken')
            }
        })
            .then(response => {
                this.props.carsFetchedFinished(response.data);
                localStorage.setItem('cars', JSON.stringify(response.data))
            })
            .catch(error => console.log(error))
    };

    carReservationHandler = (event) => {
        this.props.rentedCarID(event.target.dataset.key)
        localStorage.setItem('rentedCarId', event.target.dataset.key)
        this.props.history.push('/createReservations')
    };

    render() {
        const cars = this.props.cars.map(car => (
            <Car
                imageSource={car.image}
                carMake={car.mark}
                carModel={car.model}
                carPrice={`${car.price} Euro/Day`}
                key={car._id}
                isLoggedIn={this.props.isLoggedIn}
                reserveTheCar={this.carReservationHandler}
                carId={car._id}
                adminView={this.props.adminView}
                editInput={this.props.editInput}
                finishCarEdit={this.props.finishCarEdit}
                deleteCar={this.props.deleteCar}
            />
        ))
        return (
            <div>
                {cars}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        cars: state.cars
    }
}

const mapDispatchToProps = dispatch => {
    return {
        carsFetchedFinished: (cars) => dispatch({ type: actionTypes.POPULATE_STORE_W_CARS, carList: cars }),
        rentedCarID: (carId) => dispatch({ type: actionTypes.ADD_RENTED_CAR, rentedCarID: carId })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cars));