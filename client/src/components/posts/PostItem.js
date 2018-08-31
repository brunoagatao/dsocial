import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost, addLike, removeLike } from '../../actions/postActions';
import classnames from 'classnames';

class PostItem extends React.PureComponent {
  onDeleteClick = (id) => () => {
    const { deletePost } = this.props;
    deletePost(id);
  };

  onLikeClick = (id, likes) => () => {
    const { addLike, removeLike } = this.props;
    if (!this.findUserLike(likes)) return addLike(id);
    else return removeLike(id);
  };

  findUserLike = (likes) => {
    const { auth } = this.props;
    if (likes.filter((like) => like.user === auth.user.id).length > 0) return true;
    else return false;
  };

  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className='card card-body mb-3'>
        <div className='row'>
          <div className='col-md-2'>
            <img
              className='rounded-circle d-none d-md-block'
              src={post.avatar}
              alt=''
            />
            <br />
            <p className='text-center'>{post.name}</p>
          </div>
          <div className='col-md-10'>
            <p className='lead'>{post.text}</p>
            {showActions ? (
              <span>
                <button
                  type='button'
                  className='btn btn-light mr-1'
                  onClick={this.onLikeClick(post._id, post.likes)}
                >
                  <i className={classnames('fas fa-thumbs-up', {
                    'text-info': this.findUserLike(post.likes)
                  })}></i>
                  <span className='badge badge-light'>{post.likes.length}</span>
                </button>
                <Link to={`/post/${post._id}`} className='btn btn-info mr-1'>
                  Comments
                </Link>
                {
                  post.user === auth.user.id ? (
                    <button
                      type='button'
                      className='btn btn-danger mr-1'
                      onClick={this.onDeleteClick(post._id)}
                    >
                      <i className='fas fa-times' />
                    </button>
                  ) : null
                }
              </span>
            ) : null
            }
          </div>
        </div>
      </div>
    );
  };
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  deletePost: (id) => dispatch(deletePost(id)),
  addLike: (id) => dispatch(addLike(id)),
  removeLike: (id) => dispatch(removeLike(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);