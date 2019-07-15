import * as actionTypes from './actions';

const initialState = {
    cars: [],
    reservations: [],
    filteredReservations: [],
    token: '',
    isAdmin: false,
    rentedCarId: '',
    resStartDate: '',
    resEndDate: '',
};
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.POPULATE_STORE_W_CARS:
            return {
                ...state,
                cars: action.carList,
            };

        case actionTypes.ADD_CAR:
            const newCars = [...state.cars];
            newCars.push(action.newCar);
            return {
                ...state, cars: newCars
            };

        case actionTypes.REMOVE_CAR:
            const carsInState = [...state.cars];
            const deletedCarId = state.cars.map(car => (car._id)).indexOf(action.theDeletedCarId);
            carsInState.splice(deletedCarId, 1);
            return {
                ...state,
                cars: carsInState
            };

        case actionTypes.UPDATE_CAR:
            const theState = [...state.cars];
            const editedCarId = theState.map(car => (car._id)).indexOf(action.updatedCar._id);
            theState[editedCarId] = action.updatedCar;
            return {
                ...state,
                cars: theState,
            };

        case actionTypes.ADD_TOKEN:
            return {
                ...state,
                token: action.userToken,
            };

        case actionTypes.REMOVE_TOKEN:
            return {
                ...state,
                token: '',
            };

        case actionTypes.ADD_ADMIN:
            return {
                ...state,
                isAdmin: true
            };

        case actionTypes.REMOVE_ADMIN:
            return {
                ...state,
                isAdmin: false
            };

        case actionTypes.ADD_RENTED_CAR:
            return {
                ...state,
                rentedCarId: action.rentedCarID
            };

        case actionTypes.ADD_RESERVATION_START_DATE:
            return {
                ...state,
                resStartDate: action.reservationStartDate
            };

        case actionTypes.ADD_RESERVATION_END_DATE:
            return {
                ...state,
                resEndDate: action.reservationEndDate
            };

        case actionTypes.ADD_RESERVATION:
            const theReservations = [...state.reservations];
            theReservations.push(action.newReservation);
            return {
                ...state,
                reservations: theReservations
            };

        case actionTypes.DELETE_RESERVATION:
            const reservationsInState = [...state.reservations];
            const deletedResId = state.reservations.map(reservation => (reservation._id)).indexOf(action.theDeletedResId);
            reservationsInState.splice(deletedResId, 1);
            return {
                ...state,
                reservations: reservationsInState
            };

        case actionTypes.POPULATE_STORE_W_RESERVATIONS:
            return {
                ...state,
                reservations: action.reservationsFromDB
            };

        case actionTypes.UPDATE_RESERVATION:
            const actualState = [...state.reservations];
            const updatedResId = actualState.map(reservation => (reservation._id)).indexOf(action.updatedReservation._id);
            actualState[updatedResId] = action.updatedReservation;
            return {
                ...state,
                reservations: actualState
            };

        case actionTypes.FILTER_RESERVATIONS:
            const reservations = [...state.reservations];
            const filteredReservations = reservations.map(reservation => {
                return reservation.startDate.split('T').splice(0, 1) >= state.resStartDate && reservation.endDate.split('T').splice(0, 1) <= state.resEndDate ? reservation : null;
            });
            const finalFilter = filteredReservations.filter(reservation => reservation !== null);

            return {
                ...state,
                filteredReservations: finalFilter,
            };
        case actionTypes.DELETE_FILTERED_RESERVATIONS:
            return {
                ...state,
                filteredReservations: ''
            };
        case actionTypes.DELETE_CERTAIN_FILTERED_RESERVATION:
            const filteredReservationsInState = [...state.filteredReservations];
            const deletedFilteredResId = state.filteredReservations.map(reservation => (reservation._id)).indexOf(action.theDeletedResId);
            filteredReservationsInState.splice(deletedFilteredResId, 1);
            return {
                ...state,
                filteredReservations: filteredReservationsInState,
            };

        case actionTypes.UPDATE_FILTERED_RESERVATION:
            const theActualState = [...state.filteredReservations];
            const updFiltRestID = theActualState.map(reservation => (reservation._id)).indexOf(action.updatedFilteredReservation._id);
            theActualState[updFiltRestID] = action.updatedFilteredReservation;
            return {
                ...state,
                filteredReservations: theActualState
            };
        default:
            return state;

    }
};

export default reducer;