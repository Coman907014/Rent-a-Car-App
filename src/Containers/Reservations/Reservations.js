import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import classes from './Reservations.module.css';
import * as actionTypes from '../../store/actions';
import Car from '../Cars/Car/Car';
import Reservation from './Reservation/Reservation';
class Reservations extends Component {
    state = {
        resIsCreated: false,
        resError: false,
        startDate: '',
        endDate: '',
        isResBeingEdited: false,
    };

    componentDidMount() {
        axios.get('http://localhost:5000/bookings', {
            headers: {
                'x-auth-token': localStorage.getItem('userToken')
            }
        })
            .then(response => {
                this.props.saveReservations(response.data);
            })
            .catch(error => console.log(error));

        const theCars = JSON.parse(localStorage.getItem('cars'))
        this.props.carsFetchedFinished(theCars)
        const localRentedCarId = localStorage.getItem('rentedCarId')
        this.props.rentedCarID(localRentedCarId)

    };

    reservationDateHandler = (event) => {
        if (event.target.name === 'startDate') {
            this.props.startDateSaved(event.target.value);
        } else if (event.target.name === 'endDate') {
            this.props.endDateSaved(event.target.value);
        };
    };

    finishReservationHandler = () => {
        const theReservation = {
            'startDate': this.props.resStartDate,
            'endDate': this.props.resEndDate,
            'car': this.props.rentedCarId,
        };

        axios.post(`http://localhost:5000/bookings`, theReservation, {
            headers: {
                'x-auth-token': this.props.token
            }
        })
            .then(response => {
                if (response.statusText === 'Created') {
                    this.props.addNewReservation(response.data);
                    this.setState({ resIsCreated: true });
                } else {
                    this.setState({ resError: true });
                }
            })
            .catch(error => (
                console.log('No car was created!', error)
            ));
    };

    deleteReservationHandler = (event) => {
        const reservationId = event.target.dataset.id;
        console.log(reservationId)
        axios.delete(`http://localhost:5000/bookings/${reservationId}`, {
            headers: {
                'x-auth-token': this.props.token
            }
        })
            .then(() => {
                this.props.deleteReservation(reservationId);
                this.props.filteredReservations && this.props.deleteFilteredReservation(reservationId)
            })
            .catch(error => (
                console.log('No car was deleted!', error)
            ));
    };

    finishResEditHandler = (event) => {
        const reservationId = event.target.dataset.id

        const editedReservation = {
            'startDate': this.props.resStartDate,
            'endDate': this.props.resEndDate,
            'car': this.props.rentedCarId,
        }
        axios.put(`http://localhost:5000/bookings/${reservationId}`, editedReservation, {
            headers: {
                'x-auth-token': this.props.token
            }
        })
            .then((response) => {
                this.props.updateReservation(response.data)
                this.props.filterReservations && this.props.updateFilteredReservation(response.data)
            })
            .catch(error => (
                console.log('No car was deleted!', error)
            ));
    };

    searchReservationHandler = () => {
        this.props.filterReservations();
    };

    render() {

        const rentedCarId = this.props.rentedCarId;
        const rentedCar = this.props.cars[this.props.cars.map(car => (car._id)).indexOf(rentedCarId)];
        const selectedCar = rentedCarId &&
            <Car
                imageSource={rentedCar.image}
                carMake={rentedCar.mark}
                carModel={rentedCar.model}
                carPrice={`${rentedCar.price} Euro/Day`}
                key={rentedCar._id}
                isLoggedIn={this.props.isLoggedIn}
                reserveTheCar={this.carReservationHandler}
                carId={rentedCar._id}
                adminView={this.props.adminView}
                editInput={this.props.editInput}
                finishCarEdit={this.props.finishCarEdit}
                deleteCar={this.props.deleteCar}
            />;

        const successMessage =
            this.state.resIsCreated
                ? <div><h3>Your reservation has been registered</h3>
                    <img className={classes.ImageSuccess} src='https://media.tenor.com/images/152b66fa9279557f55ae02899ef98b47/tenor.gif' alt='Registration Success' />
                    <p>Wait for the confirmation email!</p>
                </div>
                : null;

        const allReservations = this.props.reservations.map(reservation => {
            return <Reservation
                startDate={reservation.startDate}
                endDate={reservation.endDate}
                key={reservation._id}
                reservationDeleteClick={this.deleteReservationHandler}
                reservationId={reservation._id}
                editDate={this.reservationDateHandler}
                finishEdit={this.finishResEditHandler}
            />
        });

        const sameCarReservations = this.props.reservations.map(reservation => {
            const isSameCar = reservation._id ? reservation.car === this.props.rentedCarId : null
            return (isSameCar && <Reservation
                startDate={reservation.startDate}
                endDate={reservation.endDate}
                key={reservation._id}
                reservationDeleteClick={this.deleteReservationHandler}
                reservationId={reservation._id}
                editDate={this.reservationDateHandler}
                finishEdit={this.finishResEditHandler}
            />)
        });

        const filteredReservations = this.props.filteredReservations.length >= 1 && this.props.filteredReservations.map(reservation => {
            const findIndex = this.props.cars.map((car => (car._id))).indexOf(reservation.car);
            console.log(findIndex);
            return (
                <Reservation
                    startDate={reservation.startDate}
                    endDate={reservation.endDate}
                    key={reservation._id}
                    reservationDeleteClick={this.deleteReservationHandler}
                    reservationId={reservation._id}
                    editDate={this.reservationDateHandler}
                    finishEdit={this.finishResEditHandler}
                    carImage={this.props.cars[findIndex].image}
                    carMark={this.props.cars[findIndex].mark}
                    carModel={this.props.cars[findIndex].model}
                    imageIsShown
                />)
        });

        const reservationDashboard =
            !this.props.isAdmin
                ? <div className={classes.Wrapper} >
                    <h1>It's time to rent your favorite car!</h1>
                    {selectedCar}
                    <h3>Now that you've picked the car you want to rent, choose a time interval!</h3>
                    <div className={classes.DisplayInline}>
                        <h2>From:</h2>
                        <input name='startDate' className={classes.InputDate} onChange={this.reservationDateHandler} type='date' />
                    </div>
                    <div className={classes.DisplayInline}>
                        <h2>Until:</h2>
                        <input name='endDate' className={classes.InputDate} type='date' onChange={this.reservationDateHandler} />
                    </div>
                    {successMessage}
                    {this.state.resError ? <h3>Donde esta la reservacion?!?!</h3> : null}
                    <div className={classes.ReservationButton}><h3 className={classes.InputText} onClick={this.finishReservationHandler}>Finish Reservation!</h3></div>
                </div>
                : <div className={classes.Wrapper}>
                    <h2>Search for reservations!</h2>
                    <div className={classes.DisplayInline}>
                        <h2>From:</h2>
                        <input name='startDate' className={classes.InputDate} onChange={this.reservationDateHandler} type='date' />
                    </div>
                    <div className={classes.DisplayInline}>
                        <h2>Until:</h2>
                        <input name='endDate' className={classes.InputDate} type='date' onChange={this.reservationDateHandler} />
                    </div>
                    <div className={classes.ReservationButton}><h3 className={classes.InputText} onClick={this.searchReservationHandler}>Find Reservations!</h3></div>
                </div>

        return (
            
            <div>
                {reservationDashboard}
                <div className={classes.Wrapper}>
                    {filteredReservations !== false
                        ? filteredReservations
                        : allReservations && this.props.isAdmin
                            ? allReservations
                            : sameCarReservations}
                </div>
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        isAdmin: state.isAdmin,
        token: state.token,
        rentedCarId: state.rentedCarId,
        cars: state.cars,
        resStartDate: state.resStartDate,
        resEndDate: state.resEndDate,
        reservations: state.reservations,
        filteredReservations: state.filteredReservations
    };
};

const mapDispatchToProps = dispatch => {
    return {
        carsFetchedFinished: (cars) => dispatch({ type: actionTypes.POPULATE_STORE_W_CARS, carList: cars }),
        startDateSaved: (date) => dispatch({ type: actionTypes.ADD_RESERVATION_START_DATE, reservationStartDate: date }),
        endDateSaved: (date) => dispatch({ type: actionTypes.ADD_RESERVATION_END_DATE, reservationEndDate: date }),
        saveReservations: (data) => dispatch({ type: actionTypes.POPULATE_STORE_W_RESERVATIONS, reservationsFromDB: data }),
        addNewReservation: (res) => dispatch({ type: actionTypes.ADD_RESERVATION, newReservation: res }),
        deleteReservation: (resId) => dispatch({ type: actionTypes.DELETE_RESERVATION, theDeletedResId: resId }),
        updateReservation: (updRes) => dispatch({ type: actionTypes.UPDATE_RESERVATION, updatedReservation: updRes }),
        rentedCarID: (carId) => dispatch({ type: actionTypes.ADD_RENTED_CAR, rentedCarID: carId }),
        filterReservations: () => dispatch({ type: actionTypes.FILTER_RESERVATIONS }),
        deleteFilteredReservation: (filteredRes) => dispatch({ type: actionTypes.DELETE_CERTAIN_FILTERED_RESERVATION, theDeletedResId: filteredRes}),
        updateFilteredReservation: (filteredRes) => dispatch({type: actionTypes.UPDATE_FILTERED_RESERVATION, updatedFilteredReservation: filteredRes})
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Reservations);