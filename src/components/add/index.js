import React from "react";
import PropTypes from "prop-types";
import { Message, Button, Modal, Form } from "semantic-ui-react";
import { find, map, isEmpty } from "lodash";

class AddPostDialog extends React.Component {
  static propTypes = {
    onAddCancel: PropTypes.func.isRequired,
    onAddSave: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      tags: "",
      errors: [],
      showDialog: true
    };
  }

  validateFields = () => {
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
  };

  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value,
      errors: []
    });
  };

  onAddCancel = () => {
    this.setState({
      showDialog: false
    });
    if (this.props.onAddCancel) {
      this.props.onAddCancel();
    }
  };

  onAddSave = () => {
    if (this.props.onAddSave && this.validateFields()) {
      const post = {
        title: this.state.title,
        body: this.state.body,
        tags: this.state.tags
      };
      this.props.onAddSave(post);
    }
  };

  render() {
    const { showDialog, title, body, tags, errors } = this.state;

    return (
      <Modal
        open={showDialog}
        size="tiny"
        onClose={this.onAddCancel}
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
            <Message error color="red">
              {map(errors, err => (
                <Message.Item key={err.message}>{err.message}</Message.Item>
              ))}
            </Message>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.onAddCancel}>
            Cancel
          </Button>
          <Button
            positive
            labelPosition="right"
            icon="checkmark"
            content="Add"
            onClick={this.onAddSave}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default AddPostDialog;
