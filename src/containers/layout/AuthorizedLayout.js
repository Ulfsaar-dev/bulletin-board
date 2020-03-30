import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { Home, Board, Users } from "../../containers";
import { NavBar } from "../../components/navigation";

const AuthorizedLayout = ({ match, location }) => (
  <Grid>
    <Grid.Row></Grid.Row>
    <Grid.Row className="content-wrapper">
      <Grid.Column>
        <NavBar pageName={`${location.pathname}`} />
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/users" exact component={Users} />
          <Route path="/" exact component={Board} />
          <Redirect to={`${match.url}`} />
        </Switch>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default AuthorizedLayout;
