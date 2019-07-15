import React, { Component } from 'react';
import classes from './App.module.css';
import axios from 'axios';
import AuthContext from './context/context';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions';
import Toolbar from './Components/Navigation/Toolbar/Toolbar'
import Modal from './Components/Navigation/Modal/Modal';
import Login from './Components/Navigation/Login/Login';
import Signup from './Components/Navigation/SignUp/Signup';
import Footer from './Components/Footer/Footer';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import AdminView from './Components/Pages/AdminView/AdminView';
import LandingPage from './Components/Pages/LandingPage/LandingPage';
import Reservations from './Containers/Reservations/Reservations';

class App extends Component {
  state = {
    registration: {
      firstName: '1',
      secondName: '2',
      email: '',
      password: '4',
      isCreated: false,
      errorMessage: '',
    },
    userToken: '',
    isLoginVisible: false,
    isRegisterVisible: false,
    isAdminLoginVisible: false,
    isFormAlright: false,
    isNameChecked: false,
    isPasswordNotConfirmed: false,
    hasResetMessage: false,
    validatedFormElement: '',
    isLoggedIn: false,
    isAdminLoggedIn: true,
  }

  loginButtonHandler = (e) => {
    this.setState({
      isLoginVisible: !this.state.isLoginVisible,
      hasResetMessage: false,
    })
  }

  registerButtonHandler = (e) => {
    const updatedState = { ...this.state };
    updatedState.registration.isCreated = false
    this.setState({ isRegisterVisible: !this.state.isRegisterVisible, emailCheck: false, updatedState })
  }

  resetPassHandler = () => {
    return this.setState({ hasResetMessage: !this.state.hasResetMessage })
  }

  cancelSignupHandler = () => {
    const updatedState = { ...this.state };
    updatedState.registration.isCreated = false;
    this.setState({ updatedState, isRegisterVisible: false })
  }

  userRegistrationInputHandler = (event) => {
    const input = event.target.value;
    const inputType = event.currentTarget.name;
    let updatedState = { ...this.state };
    updatedState.registration[inputType] = input;
    this.setState({ updatedState });
  }

  validationHandler = (event) => {
    const input = event.target.value;
    const inputType = event.currentTarget.placeholder;
    this.userRegistrationInputHandler(event)
    if (input.length < 5) {
      this.setState({ isNameChecked: true, validatedFormElement: inputType })
    } else {
      this.setState({ isNameChecked: false, validatedFormElement: '' })
    }
    const allLetters = input.split('');
    const specialCharacter = allLetters.filter(element => element === '@')
    if (specialCharacter.length < 1 && event.currentTarget.name === 'email') {
      let updatedState = { ...this.state }
      updatedState.registration.email = event.target.value
      return this.setState({ emailCheck: true, validatedFormElement: event.currentTarget.placeholder, updatedState })
    } else {
      return this.setState({ emailCheck: false });
    }
  }

  passwordHandler = (event) => {
    let updatedState = { ...this.state };
    updatedState.registration.password = event.target.value
    this.setState({ updatedState })
  }

  checkPasswordHandler = (event) => {
    const input = event.target.value;
    input !== this.state.registration.password
      ? this.setState({ isPasswordNotConfirmed: true })
      : this.setState({ isPasswordNotConfirmed: false });
  };

  createUserHandler = () => {
    const fullName = `${this.state.registration.firstName} ${this.state.registration.secondName}`
    const userInformation = {
      "name": fullName,
      "email": this.state.registration.email,
      "password": this.state.registration.password,
    }

    axios.post(`http://localhost:5000/users`, userInformation)
      .then(response => {
        const updatedState = { ...this.state }
        if (response.statusText === 'Created') {
          updatedState.registration.isCreated = true
        }
        this.setState({ updatedState });
      })
      .catch(error => {
        const errorMessage = error.response.statusText;
        if (errorMessage === "Bad Request") {
          const updatedState = { ...this.state };
          updatedState.registration.errorMessage = true;
          this.setState({ updatedState });
        };
      });
  }

  createUserHandler = () => {
    const fullName = this.state.registration.firstName + ' ' + this.state.registration.secondName
    const userInformation = {
      "name": fullName,
      "email": this.state.registration.email,
      "password": this.state.registration.password,
    }
    axios.post(`http://localhost:5000/users`, userInformation)
      .then(response => {
        const updatedState = { ...this.state }
        if (response.statusText === 'Created') {
          updatedState.registration.isCreated = true
        }
        this.setState({ updatedState })
      })
      .catch(error => {
        const errorMessage = error.response.statusText;
        if (errorMessage === "Bad Request") {
          const updatedState = { ...this.state }
          updatedState.registration.errorMessage = true
          this.setState({ updatedState })
        }
      })
  }

  resetPasswordHandler = () => {
    if (this.state.registration.email) {
      const mailOptions = {
        'from': 'contact@aixam-rent.ro',
        'to': 'alexandru.coman@pitechnologies.ro',
        'subject': 'Aixam Rent 4U - Reset Password Link',
        'text': 'This is the password link -> LINK <-. It will be available for 24 hours.'
      }
      axios.post(`http://localhost:5000/send-email`, mailOptions)
      alert(`An email was sent to the specified email address.`)
    } else {
      alert(`Please specify your e-mail account!`)
    }
  }

  inputPasswordHandler = (event) => {
    let updatedState = { ...this.state }
    updatedState.registration.password = event.target.value;
    this.setState(updatedState)
  };

  loginUserHandler = () => {
    const userInformation = {
      'email': this.state.registration.email,
      'password': this.state.registration.password,
    }
    axios.post(`http://localhost:5000/users/authenticate`, userInformation)
      .then(response => {
        if (response.statusText === 'OK') {
          const isAdmin = this.state.registration.email === 'admin@admin.com';
          isAdmin && this.props.adminIsLoggedIn();
          isAdmin && localStorage.setItem('isAdmin', true);
          localStorage.setItem('userToken', response.headers['x-auth-token']);
          this.setState({ isLoginVisible: false, isLoggedIn: true, isAdminLoggedIn: isAdmin, isAdminLoginVisible: false, userToken: response.headers['x-auth-token'] });
          this.props.tokenToStore(response.headers['x-auth-token']);
        }
        this.state.isAdminLoggedIn && this.props.history.push('/admin');
      })
      .catch(error => {
        alert(`There's been an error during authentication. Please try again!`)
        console.log(error)
      })
  };

  userLogoutHandler = () => {
    this.setState({ isLoggedIn: false, isAdminLoggedIn: false, isAdmin: false, });
    localStorage.removeItem('userToken');
    this.props.removeToken();
    localStorage.removeItem('isAdmin');
    this.props.adminIsLoggedOut();
    this.props.clearFilteredReservations();
    this.props.history.push('/');
  }

  adminLoginHandler = () => {
    this.setState({ isAdminLoginVisible: !this.state.isAdminLoginVisible })
  }

  componentDidMount = () => {
    const userToken = localStorage.getItem('userToken');
    const isAdmin = localStorage.getItem('isAdmin');
    userToken && this.props.tokenToStore(userToken);
    isAdmin && this.props.adminIsLoggedIn();
    this.setState({ isLoggedIn: !!userToken, isAdminLoggedIn: !!isAdmin });
  }

  render() {
    const loginModal =
      this.state.isLoginVisible
        ? <Modal show={this.state.isLoginVisible} modalClosed={this.loginButtonHandler}>
          <Login
            cancelLogin={this.loginButtonHandler}
            resetPass={this.resetPassHandler}
            emailCheck={this.validationHandler}
            error={this.state.emailCheck}
            resetMessage={this.state.hasResetMessage}
            resetPassword={this.resetPasswordHandler}
            inputPassword={this.inputPasswordHandler}
            loginUser={this.loginUserHandler} />
        </Modal>
        : null;

    const registerModal =
      this.state.isRegisterVisible
        ? <Modal show={this.state.isRegisterVisible} modalClosed={this.registerButtonHandler}>
          <Signup
            cancelSignup={this.cancelSignupHandler}
            formCheck={this.validationHandler}
            createPass={this.passwordHandler}
            confirmPassword={this.checkPasswordHandler}
            passConfirmationError={this.state.isPasswordNotConfirmed}
            element={this.state.validatedFormElement}
            signUp={this.createUserHandler}
            signUpSuccess={this.state.registration.isCreated}
            signUpFailure={this.state.registration.errorMessage} />
        </Modal>
        : null;

    const adminModal =
      this.state.isAdminLoginVisible
        ? <Modal show={this.state.isAdminLoginVisible} modalClosed={this.adminLoginHandler}>
          <AdminLogin
            userInput={this.userRegistrationInputHandler}
            cancelLogin={this.adminLoginHandler}
            loginUser={this.loginUserHandler}
            adminIsLoggedIn={this.state.isAdminLoggedIn} />
        </Modal>
        : null;

    let routes = (
      <Switch>
        <Route path="/" exact render={() => <LandingPage isLoggedIn={this.state.isLoggedIn} userToken={this.state.userToken} />} />
        <Route path="/admin" exact component={AdminView} />
        <Route path="/createReservations" exact component={Reservations} />

      </Switch>
    )
    
    return (
      <div className={classes.App}>
        <AuthContext.Provider value={{ authenticated: this.state.isLoggedIn, isAdmin: this.state.isAdminLoggedIn }}>
          <Toolbar
            login={this.loginButtonHandler}
            register={this.registerButtonHandler}
            userLogOut={this.userLogoutHandler}
            isLoggedIn={this.state.isLoggedIn}
            adminLogin={this.adminLoginHandler} />
        </AuthContext.Provider>
        {loginModal}
        {registerModal}
        {adminModal}
        {routes}
        <Footer />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tokenToStore: (token) => dispatch({ type: actionTypes.ADD_TOKEN, userToken: token }),
    removeToken: () => dispatch({ type: actionTypes.REMOVE_TOKEN }),
    adminIsLoggedIn: () => dispatch({ type: actionTypes.ADD_ADMIN }),
    adminIsLoggedOut: () => dispatch({ type: actionTypes.REMOVE_ADMIN }),
    clearFilteredReservations: () => dispatch({ type: actionTypes.DELETE_FILTERED_RESERVATIONS })
  }
}

export default connect(null, mapDispatchToProps)(withRouter(App));
