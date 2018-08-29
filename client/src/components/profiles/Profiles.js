import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';

class Profiles extends React.PureComponent {

  componentDidMount = () => {
    const { getProfiles } = this.props;
    getProfiles();
  };

  render() {
    const { profile } = this.props;
    const { profiles, loading } = profile;

    let profileItems;
    if (profiles === null || loading) profileItems = <Spinner />
    else {
      if (profiles.length > 0) profileItems = profiles.map((profile) => (
        <ProfileItem
          key={profile._id}
          profile={profile}
        />
      ));
      else profileItems = <h4>No profiles found...</h4>;
    };

    return (
      <div className='profiles'>
        <div>
          <div className='row'>
            <div className='col-md12'>
              <h1 className='display-4 text-center'>Developer Profiles</h1>
              <p className='lead text-center'>
                Browse and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  };
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

const mapDispatchToProps = (dispatch) => ({
  getProfiles: () => dispatch(getProfiles())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);