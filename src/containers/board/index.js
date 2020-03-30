import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Modal,
  Button,
  Grid,
  Dimmer,
  Header,
  Loader,
  Segment,
  Message
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as _ from 'lodash';
import {
  fetchPosts,
  addPost,
  updatePost,
  removePost
} from '../../actions/postsAction';
import EditPostDialog from '../../components/edit';
import AddPostDialog from '../../components/add';
import './styles.css';
import MessageCard from '../../components/messagecard';
import ViewOptions from '../../components/ViewOptions';
import { filterByTags, orderPosts } from '../../utils/utility';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: typeof props.posts !== 'undefined' ? props.posts.results : [],
      isLoading:
        typeof props.isLoading !== 'undefined' ? props.isLoading : false,
      error: typeof props.error !== 'undefined' ? props.error : null,
      selectedPost: null,
      addPost: false,
      removeIndex: -1,
      // Filter and Order Settings
      viewPosts: [],
      tags: [],
      options: {
        title: 0,
        created: 0,
        popularity: 0
      },
      user: typeof props.user !== 'undefined' ? props.user._id : null,
      tagOptions: [] // {key: 'tag1', value: 'tag1', text: 'Tag1'}
    };
  }
  componentDidMount() {
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
    const { tags, options } = this.state;
    if (this.props !== nextProps) {
      const posts =
        typeof nextProps.posts !== 'undefined' ? nextProps.posts.results : [];
      const viewPosts = orderPosts(filterByTags(posts, tags), options);
      const filteredPostsByTags = posts.filter(post => !!post.tags);
      const tagOptions = _.uniq(
        _.flatten(
          filteredPostsByTags.map(post =>
            post.tags.split(',').map(tag => tag.trim())
          )
        )
      ).map(tag => ({
        key: tag,
        value: tag,
        text: tag
      }));
      this.setState({
        posts,
        viewPosts,
        tagOptions,
        isLoading:
          typeof nextProps.isLoading !== 'undefined'
            ? nextProps.isLoading
            : false,
        error: typeof nextProps.error !== 'undefined' ? nextProps.error : null
      });
    }
  }

  onUpvote = (post, index) => {
    post.upvote++;
    this.props.updatePost(post, index);
    this.setState({
      selectedPost: null
    });
  };
  onDownvote = (post, index) => {
    post.downvote++;
    this.props.updatePost(post, index);
    this.setState({
      selectedPost: null
    });
  };

  onRowEdit = data => {
    this.setState({
      selectedPost: data
    });
  };

  onRowRemove = index => {
    this.setState({
      removeIndex: index
    });
  };

  onEditSave = (post, index) => {
    this.props.updatePost(post, index);
    this.setState({
      selectedPost: null
    });
  };

  onEditCancel = () => {
    this.setState({
      selectedPost: null
    });
  };

  onAddSave = post => {
    this.props.addPost(post);
    this.setState({
      addPost: false
    });
  };

  onAddCancel = () => {
    this.setState({
      addPost: false
    });
  };

  onRemoveConfirm = () => {
    this.props.removePost(this.state.removeIndex);
    this.setState({
      removeIndex: -1
    });
  };

  onRemoveClose = () => {
    this.setState({
      removeIndex: -1
    });
  };

  onClickAdd = () => {
    this.setState({
      addPost: true
    });
  };

  onChangeFilter = tags => {
    // process with tags
    const { options, posts } = this.state;
    const viewPosts = orderPosts(filterByTags(posts, tags), options);
    this.setState({ tags, viewPosts });
  };

  onChangeOption = (type, value) => {
    const { tags, posts, options } = this.state;
    const newOptions = { ...options, [type]: value ? 1 : 0 };
    const viewPosts = orderPosts(filterByTags(posts, tags), newOptions);
    this.setState({ options: newOptions, viewPosts });
  };

  renderPosts() {
    const { viewPosts } = this.state;
    return viewPosts.map((row, index) => {
      return (
        <MessageCard
          key={index}
          props={row}
          onEdit={this.onRowEdit.bind(this, row)}
          onRemove={this.onRowRemove.bind(this, row._id)}
          onUpvote={this.onUpvote.bind(this)}
          onDownvote={this.onDownvote.bind(this)}
          editable={this.state.user === row.userId}
        />
      );
    });
  }

  render() {
    const {
      isLoading,
      error,
      selectedPost,
      addPost,
      removeIndex,
      tagOptions
    } = this.state;

    return (
      <Grid.Row className="report-board__container">
        {isLoading && (
          <Dimmer active inverted>
            <Loader inverted content="Loading" />
          </Dimmer>
        )}
        <Header as="h2">
          <Header.Content className="title">Bulletin Board</Header.Content>
          <Button floated="right" primary onClick={this.onClickAdd}>
            Add New Bullet
          </Button>
          <ViewOptions
            tags={tagOptions}
            onChangeFilter={this.onChangeFilter}
            onChangeOption={this.onChangeOption}
          />
        </Header>
        <Segment stacked>
          {error &&
            error.message && (
              <Message negative>
                <Message.Header>Sorry ...</Message.Header>
                <p>{error.message}</p>
              </Message>
            )}
          {this.renderPosts()}
        </Segment>
        {addPost && (
          <AddPostDialog
            onAddCancel={this.onAddCancel.bind(this)}
            onAddSave={this.onAddSave.bind(this)}
          />
        )}
        {selectedPost !== null && (
          <EditPostDialog
            post={selectedPost}
            onEditCancel={this.onEditCancel.bind(this)}
            onEditSave={this.onEditSave.bind(this)}
          />
        )}
        <Modal
          open={removeIndex !== -1}
          size="mini"
          onClose={this.onRemoveClose.bind(this)}
        >
          <Modal.Header>Remove tracked post?</Modal.Header>
          <Modal.Content>
            <p>Do you really want to delete your post?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.onRemoveClose.bind(this)}>
              No
            </Button>
            <Button
              positive
              labelPosition="right"
              icon="checkmark"
              content="Yes"
              onClick={this.onRemoveConfirm.bind(this)}
            />
          </Modal.Actions>
        </Modal>
      </Grid.Row>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  user: state.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPosts,
      addPost,
      updatePost,
      removePost
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board));
