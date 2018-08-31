import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import isEmpty from '../../validation/isEmpty';

class Post extends React.PureComponent {

  componentDidMount = () => {
    const { getPost, match } = this.props;
    const { id } = match.params;
    if (id) getPost(id);
  };

  componentWillReceiveProps = (nextProps) => {
    const { post, history } = this.props;
    if (isEmpty(nextProps.post.post) && post.loading) {
      history.push('/not-found');
    };
  };

  render() {
    const { post, loading } = this.props.post;

    let postContent;
    if (isEmpty(post) || loading) postContent = <Spinner />
    else postContent = (
      <div>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <CommentFeed postId={post._id} comments={post.comments} />
      </div>
    );

    return (
      <div className='post'>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to='/feed' className='btn btn-light mb-3'>
                Back to Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  };
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

const mapDispatchToProps = (dispatch) => ({
  getPost: (id) => dispatch(getPost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));