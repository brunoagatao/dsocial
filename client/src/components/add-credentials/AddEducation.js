import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class AddEducation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
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
      addEducation
    } = this.props;

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = this.state;

    const eduData = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    }

    addEducation(eduData, history);
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
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
      errors,
      disabled
    } = this.state;

    return (
      <div className='add-education'>
        <div className='container'>
          <div className='row'>
            <div className='col-md8-m-auto'>
              <Link className='btn btn-light' to='/dashboard'>
                Go Back
              </Link>
              <h1 className='display-4 text-center'>Add Education</h1>
              <p className='lead text-center'>Add any school, bootcamp, etc, that you have attended</p>
              <small className='d-block pb-3'>* = required fields</small>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder='* School'
                  name='school'
                  value={school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder='* Degree or Certification'
                  name='degree'
                  value={degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder='* Field of Study'
                  name='fieldofstudy'
                  value={fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
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
                    Current School
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder='Program Description'
                  name='description'
                  value={description}
                  onChange={this.onChange}
                  error={errors.description}
                  info='Tell us about the program that you are in'
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  addEducation: (expData, history) => dispatch(addEducation(expData, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEducation));