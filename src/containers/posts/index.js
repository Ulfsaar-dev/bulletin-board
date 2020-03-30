import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Grid,
  Dimmer,
  Message,
  Table,
  Button,
  Icon,
  Modal,
  Header,
  Segment,
  Loader
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchPosts,
  addPost,
  updatePost,
  removePost
} from '../../actions/postsAction';
import EditPostDialog from '../../components/edit';
import AddPostDialog from '../../components/add';
import './styles.css';

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: typeof props.posts !== 'undefined' ? props.posts.results : [],
      isLoading:
        typeof props.isLoading !== 'undefined' ? props.isLoading : false,
      error: typeof props.error !== 'undefined' ? props.error : null,
      selectedPost: null,
      addPost: false,
      removeIndex: -1
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        posts:
          typeof nextProps.posts !== 'undefined' ? nextProps.posts.results : [],
        isLoading:
          typeof nextProps.isLoading !== 'undefined'
            ? nextProps.isLoading
            : false,
        error: typeof nextProps.error !== 'undefined' ? nextProps.error : null
      });
    }
  }

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

  renderPosts() {
    const { posts } = this.state;

    return posts.map((row, index) => {
      return (
        <Table.Row key={index}>
          <Table.Cell collapsing>{row.title}</Table.Cell>
          <Table.Cell collapsing>{row.body}</Table.Cell>
          <Table.Cell collapsing>{row.tags}</Table.Cell>
          <Table.Cell collapsing>{row.upvote}</Table.Cell>
          <Table.Cell collapsing>{row.downvote}</Table.Cell>
          <Table.Cell collapsing>
            <Button
              color="green"
              icon="edit"
              size="mini"
              onClick={this.onRowEdit.bind(this, row)}
            />
            <Button
              color="red"
              icon="delete"
              size="mini"
              onClick={this.onRowRemove.bind(this, row._id)}
            />
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    const { isLoading, error, selectedPost, addPost, removeIndex } = this.state;
    return (
      <Grid.Row>
        {isLoading && (
          <Dimmer active inverted>
            <Loader inverted content="Loading" />
          </Dimmer>
        )}
        <Header as="h2">
          <Icon name="clock" />
          <Header.Content>Posts Tracked</Header.Content>
        </Header>
        <Segment stacked>
          {error &&
            error.message && (
              <Message negative>
                <Message.Header>Sorry ...</Message.Header>
                <p>{error.message}</p>
              </Message>
            )}
          <Table compact="very" celled striped responsive>
            <Table.Header responsive>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Body</Table.HeaderCell>
                <Table.HeaderCell>Tags</Table.HeaderCell>
                <Table.HeaderCell>UpVote</Table.HeaderCell>
                <Table.HeaderCell>DownVote</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.renderPosts()}</Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell>
                  <Button
                    floated="right"
                    primary
                    size="small"
                    onClick={this.onClickAdd}
                  >
                    Add Post
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
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
  isLoading: state.posts.isLoading,
  error: state.posts.error
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));
