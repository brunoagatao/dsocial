import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  };

  componentDidMount = () => {
    const { auth, history } = this.props;
    if (auth.isAuthenticated) history.push('/dashboard');
  };

  componentWillReceiveProps = (nextProps) => {
    const { history } = this.props;
    if (nextProps.auth.isAuthenticated) history.push('/dashboard');
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      history,
      loginUser
    } = this.props;

    const {
      email,
      password
    } = this.state;

    const user = {
      email,
      password
    };

    loginUser(user, history);
  };

  render() {
    const {
      email,
      password,
      errors
    } = this.state;

    return (
      <div className='login'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Log In</h1>
              <p className='lead text-center'>Sign in to your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder='Email address'
                  name='email'
                  type='email'
                  value={email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder='Password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <input
                  type='submit'
                  className='btn btn-info btn-block mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (userData, history) => dispatch(loginUser(userData, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
