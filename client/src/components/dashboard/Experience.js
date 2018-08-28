import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExperience } from '../../actions/profileActions';
import Moment from 'react-moment';

class Experience extends React.PureComponent {
  onDeleteClick = (id) => (e) => {
    const { deleteExperience } = this.props;
    deleteExperience(id);
  };

  render() {
    const experience = this.props.experience.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format='YYYY/MM/DD'>
            {exp.from}
          </Moment> - {' '}
          {exp.to ?
            <Moment format='YYYY/MM/DD'>
              {exp.to}
            </Moment>
            :
            'Now'
          }
        </td>
        <td>
          <button
            className='btn btn-danger'
            onClick={this.onDeleteClick(exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className='mb-4'>Experience Credentials</h4>
        <table className='table'>
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {experience}
          </tbody>
        </table>
      </div>
    );
  };
};

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
  experience: PropTypes.array.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  deleteExperience: (id) => dispatch(deleteExperience(id))
});

export default connect(null, mapDispatchToProps)(Experience);