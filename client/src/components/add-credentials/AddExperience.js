import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class AddExperience extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    };
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    };
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      history,
      addExperience
    } = this.props;

    const {
      company,
      title,
      location,
      from,
      to,
      current,
      description
    } = this.state;

    const expData = {
      company,
      title,
      location,
      from,
      to,
      current,
      description
    }

    addExperience(expData, history);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = (e) => {
    this.setState((prevState) => ({
      disabled: !prevState.disabled,
      current: !prevState.current
    }))
  };

  render() {
    const {
      company,
      title,
      location,
      from,
      to,
      current,
      description,
      errors,
      disabled
    } = this.state;

    return (
      <div className='add-experience'>
        <div className='container'>
          <div className='row'>
            <div className='col-md8-m-auto'>
              <Link className='btn btn-light' to='/dashboard'>
                Go Back
              </Link>
              <h1 className='display-4 text-center'>Add Experience</h1>
              <p className='lead text-center'>Add any job or position that you have had in the past or current</p>
              <small className='d-block pb-3'>* = required fields</small>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder='* Company'
                  name='company'
                  value={company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder='* Job Title'
                  name='title'
                  value={title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder='Location'
                  name='location'
                  value={location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name='from'
                  type='date'
                  value={from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name='to'
                  type='date'
                  value={to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={disabled ? 'disabled' : ''}
                />
                <div className='form check mb-4'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name='current'
                    value={current}
                    checked={current}
                    onChange={this.onCheck}
                    id='current'
                  />
                  <label htmlFor='current' className='form-check-label'>
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder='Job Description'
                  name='description'
                  value={description}
                  onChange={this.onChange}
                  error={errors.description}
                  info='Tell us about the position'
                />
                <input
                  className='btn btn-info btn-block mt-4'
                  type='submit'
                  value='Submit'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  addExperience: (expData, history) => dispatch(addExperience(expData, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExperience));