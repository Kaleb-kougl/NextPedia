import React, { Component } from 'react';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../../index';
import * as ROUTES from '../../../constants/routes';
import './signin.css';

const SignInPage = () => (
  <div className="container-div">
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">Sign In</h1>
        <SignInForm />
        <PasswordForgetLink />
        {/* <SignUpLink /> */}
      </div>
    </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {

    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        localStorage.user = email;
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit" className="btn btn-outline-success">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

const SignInLink = () => (
  <p>
    Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </p>
);

export default SignInPage;

export { SignInForm, SignInLink, SignInPage };