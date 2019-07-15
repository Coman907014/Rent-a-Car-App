import React, { Component } from 'react';
import classes from './Reservation.module.css';
import editIcon from '../../../assets/images/editIcon.svg';
import deleteIcon from '../../../assets/images/deleteIcon.png';
import finishResEdit from '../../../assets/images/finishResEdit.svg';


class Reservation extends Component {
    state = {
        isEditable: false
    }

    switchEditReservationHandler = () => {
        this.setState({ isEditable: !this.state.isEditable });
    };

    render() {
        const startDate =
            this.state.isEditable
                ? <input name='startDate' className={classes.InputDate} onChange={this.props.editDate} type='date' />
                : <span className={classes.Dates}>{this.props.startDate.split('T').splice(0, 1)}</span>;

        const endDate =
            this.state.isEditable
                ? <input name='endDate' className={classes.InputDate} onChange={this.props.editDate} type='date' />
                : <span className={classes.Dates}>{this.props.endDate.split('T').splice(0, 1)}</span>;

        const button =
            !this.state.isEditable
                ? <img className={classes.Delete} src={deleteIcon} alt='Delete Reservation' data-id={this.props.reservationId} onClick={this.props.reservationDeleteClick} />
                : <img className={classes.Delete} src={finishResEdit} alt='Finish Reservation Edit' data-id={this.props.reservationId} onClick={this.props.finishEdit} />;
                
        return (
            <div className={classes.Wrapper}>
                {this.props.imageIsShown && <div><img src={this.props.carImage ? this.props.carImage : null} alt="Filtered Reservation's Car" className={classes.Image} />
                    <h1>{this.props.carMark} {this.props.carModel}</h1></div>}
                <h1 className={classes.DisplayInline}>
                    Start Date: {startDate}
                    <span onClick={this.switchEditReservationHandler}><img className={classes.Edit} src={editIcon} alt='Edit Reservation' />
                        {button}
                    </span>
                </h1>
                <h1 className={classes.DisplayInline}>
                    End Date: {endDate}
                </h1>
            </div>
        );
    }
};



export default Reservation;