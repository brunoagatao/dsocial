import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProfileByHandle } from '../../actions/profileActions';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';

class Profile extends React.PureComponent {
  componentDidMount = () => {
    const { getProfileByHandle, match } = this.props;
    const { handle } = match.params;
    if (handle) getProfileByHandle(handle);
  };

  componentWillReceiveProps = (nextProps) => {
    const { profile, history } = this.props;
    if (!nextProps.profile.profile && profile.loading) {
      history.push('/not-found');
    };
  };

  render() {
    const { profile, loading } = this.props.profile;

    let profileContent;
    if (profile === null || loading) profileContent = <Spinner />
    else {
      profileContent = (
        <div>
          <div className='row'>
            <div className='col-md-6'>
              <Link to='/profiles' className='btn btn-light mb-3 float-left'>
                Back to Profiles
              </Link>
            </div>
            <div className='col-md-6' />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience} />
          {profile.githubusername ? <ProfileGithub username={profile.githubusername} /> : null}
        </div>
      );
    };

    return (
      <div className='profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              {profileContent}
            </div>
          </div>
        </div>
      </div>
    );
  };
};

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

const mapDispatchToProps = (dispatch) => ({
  getProfileByHandle: (handle) => dispatch(getProfileByHandle(handle))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);