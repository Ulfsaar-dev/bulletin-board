import React from "react";
import { Button, Card, Header, Icon } from "semantic-ui-react";
import "./styles.css";
const MessageCard = ({
  props,
  onEdit,
  onRemove,
  onUpvote,
  onDownvote,
  editable
}) => {
  const handleEdit = () => {
    onEdit(props);
  };
  const handleRemove = () => {
    onRemove(props);
  };
  const handleUpvote = () => {
    const post = {
      title: props.title,
      body: props.body,
      tags: props.tags,
      upvote: props.upvote++,
      downvote: props.downvote
    };
    onUpvote(post, props._id);
  };
  const handleDownvote = () => {
    const post = {
      title: props.title,
      body: props.body,
      tags: props.tags,
      upvote: props.upvote,
      downvote: props.downvote++
    };
    onDownvote(post, props._id);
  };
  return (
    <Card className="message-card">
      <Card.Content>
        <Header as="h2" className="message-header">
          <Header.Content>{props.title}</Header.Content>
          <div>
            <div className="ui right labeled button">
              <button
                className="ui icon button"
                tabIndex="0"
                onClick={handleUpvote}
              >
                <Icon name="thumbs up" />
              </button>
              <a className="ui left pointing basic label">{props.upvote}</a>
            </div>
            <div className="ui left labeled button">
              <a className="ui right pointing basic label">{props.downvote}</a>
              <button
                className="ui icon button"
                tabIndex="1"
                onClick={handleDownvote}
              >
                <Icon name="thumbs down" />
              </button>
            </div>
          </div>
        </Header>
      </Card.Content>
      <Card.Content>{props.body}</Card.Content>
      <Card.Content extra>{props.tags}</Card.Content>
      {editable && (
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green" onClick={handleEdit}>
              <Icon name="edit" />
              Edit
            </Button>
            <Button basic color="red" onClick={handleRemove}>
              <Icon name="delete" />
              Delete
            </Button>
          </div>
        </Card.Content>
      )}
    </Card>
  );
};

export default MessageCard;
