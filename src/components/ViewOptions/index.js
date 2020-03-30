import React from "react";
import { Responsive, Segment } from "semantic-ui-react";
import MainViewOptions from "./MainViewOptions";
import MobileViewOptions from "./MobileViewOptions";

const ViewOptionsWrapper = ({ tags, onChangeFilter, onChangeOption }) => {
  return (
    <Segment.Group>
      <Responsive as={Segment} minWidth={564}>
        <MainViewOptions
          tags={tags}
          onChangeFilter={onChangeFilter}
          onChangeOption={onChangeOption}
        />
      </Responsive>
      <Responsive as={Segment} maxWidth={563}>
        <MobileViewOptions
          tags={tags}
          onChangeFilter={onChangeFilter}
          onChangeOption={onChangeOption}
        />
      </Responsive>
    </Segment.Group>
  );
};

export default ViewOptionsWrapper;
