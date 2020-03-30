import React from "react";
import PropTypes from "prop-types";
import { Message, Button, Modal, Form } from "semantic-ui-react";
import { find, map, isEmpty } from "lodash";

class EditPostDialog extends React.Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    onEditCancel: PropTypes.func.isRequired,
    onEditSave: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      _id: props.post._id,
      title: props.post.title,
      body: props.post.body,
      tags: props.post.tags,
      upvote: props.post.upvote,
      downvote: props.post.downvote,
      errors: [],
      showDialog: true
    };
  }

  validateFields() {
    const { title, body, tags } = this.state;
    const errors = [];

    if (isEmpty(title)) {
      errors.push({ field: "title", message: "Title is required" });
    }

    if (isEmpty(body)) {
      errors.push({ field: "body", message: "Body is required" });
    }

    if (isEmpty(tags)) {
      errors.push({ field: "tags", message: "Tags are required" });
    }

    this.setState({
      errors: errors
    });

    return isEmpty(errors);
  }

  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value,
      errors: []
    });
  };

  onEditCancel = () => {
    this.setState({
      showDialog: false
    });
    if (this.props.onEditCancel) {
      this.props.onEditCancel();
    }
  };

  onEditSave = () => {
    if (this.props.onEditSave && this.validateFields()) {
      const post = {
        title: this.state.title,
        body: this.state.body,
        tags: this.state.tags,
        upvote: this.state.upvote,
        downvote: this.state.downvote
      };
      this.props.onEditSave(post, this.state._id);
    }
  };

  render() {
    const {
      showDialog,
      title,
      body,
      tags,
      upvote,
      downvote,
      errors
    } = this.state;

    return (
      <Modal
        open={showDialog}
        size="tiny"
        onClose={this.onEditCancel.bind(this)}
        closeOnRootNodeClick={false}
      >
        <Modal.Header>Edit Post</Modal.Header>
        <Modal.Content>
          <Form error={!isEmpty(errors)}>
            <Form.Field>
              <label>Title:</label>
              <Form.Input
                placeholder="Title"
                value={title}
                name="title"
                type="text"
                onChange={this.handleChange}
                error={!!find(errors, { field: "title" })}
              />
            </Form.Field>
            <Form.Field>
              <label>Body:</label>
              <Form.Input
                placeholder="Body"
                value={body}
                name="body"
                type="text"
                onChange={this.handleChange}
                error={!!find(errors, { field: "body" })}
              />
            </Form.Field>
            <Form.Field>
              <label>Tags:</label>
              <Form.Input
                placeholder="Tags"
                value={tags}
                name="tags"
                type="text"
                onChange={this.handleChange}
                error={!!find(errors, { field: "tags" })}
              />
            </Form.Field>
            <Form.Field>
              <label>UpVote:</label>
              <Form.Input
                placeholder="UpVote"
                value={upvote}
                name="upvote"
                type="number"
                onChange={this.handleChange}
                error={!!find(errors, { field: "upvote" })}
              />
            </Form.Field>
            <Form.Field>
              <label>DownVote:</label>
              <Form.Input
                placeholder="DownVote"
                value={downvote}
                name="downvote"
                type="number"
                onChange={this.handleChange}
                error={!!find(errors, { field: "downvote" })}
              />
            </Form.Field>
            <Message error color="red">
              {map(errors, err => (
                <Message.Item key={err.message}>{err.message}</Message.Item>
              ))}
            </Message>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.onEditCancel}>
            Cancel
          </Button>
          <Button
            positive
            labelPosition="right"
            icon="checkmark"
            content="Save"
            onClick={this.onEditSave}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default EditPostDialog;
