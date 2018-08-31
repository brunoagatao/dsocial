import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class CommentForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      auth,
      postId,
      addComment
    } = this.props;

    const newComment = {
      text: this.state.text,
      name: auth.user.name,
      avatar: auth.user.avatar
    };

    addComment(postId, newComment);
    this.setState({ text: '' });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { text, errors } = this.state;
    return (
      <div className='post-form mb-3'>
        <div className='card card-info'>
          <div className='card-header bg-info text-white'>
            Make a comment...
          </div>
          <div className='card-body'>
            <form noValidate onSubmit={this.onSubmit}>
              <div className='form-group'>
                <TextAreaFieldGroup
                  placeholder='Reply to post'
                  name='text'
                  value={text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type='submit' className='btn btn-dark'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  };
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  addComment: (postId, commentData) => dispatch(addComment(postId, commentData))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);