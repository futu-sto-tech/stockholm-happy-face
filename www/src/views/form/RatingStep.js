import React from "react";

import Flex from "../../components/Flex";
import Button from "./styled/Button";
import Label from "./styled/Label";
import RatingContainer from "./RatingContainer";

const RatingStep = ({ onSubmit, loading }) => (
  <>
    <Label>Rate your week</Label>
    <RatingContainer />

    <Flex justify="center">
      <Button type="submit" disabled={loading} onClick={onSubmit}>
        {loading ? "Loading..." : "Send"}
      </Button>
    </Flex>
  </>
);

export default RatingStep;
