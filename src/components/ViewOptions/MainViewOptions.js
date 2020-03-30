import React from "react";
import { Dropdown, Container, Grid, Checkbox, Header } from "semantic-ui-react";
import "./style.css";

const MainViewOptions = ({ tags, onChangeFilter, onChangeOption }) => {
  const changeOption = type => (e, data) => {
    if (onChangeOption) {
      onChangeOption(type, data.checked);
    }
  };

  const changeFilter = (e, data) => {
    if (onChangeFilter) {
      onChangeFilter(data.value);
    }
  };

  return (
    <Container fluid className="medium-font">
      <Grid className="search-row">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3">Filter Settings</Header>
            <Dropdown
              placeholder="Tags"
              fluid
              multiple
              selection
              options={tags}
              onChange={changeFilter}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as="h3">Order Settings</Header>
            <Grid.Column>
              <Checkbox label="Title" onChange={changeOption("title")} />
            </Grid.Column>
            <Grid.Column>
              <Checkbox label="Created At" onChange={changeOption("created")} />
            </Grid.Column>
            <Grid.Column>
              <Checkbox
                label="Popularity"
                onChange={changeOption("popularity")}
              />
            </Grid.Column>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default MainViewOptions;
