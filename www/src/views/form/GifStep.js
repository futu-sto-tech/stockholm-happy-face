import React from "react";

import Flex from "../../components/Flex";
import Button from "./styled/Button";
import Form from "./styled/Form";
import SearchBoxContainer from "./SearchBoxContainer";
import ResultListContainer from "./ResultListContainer";

const GifStep = ({ onSubmit, url, onChangeUrl }) => (
  <Form onSubmit={onSubmit}>
    <Form.Field>
      <Form.Label htmlFor="gif-url">Link to GIF</Form.Label>
      <Form.Input
        id="gif-url"
        placeholder="https://giphy.com/jadowijawiodj"
        required={true}
        type="url"
        value={url}
        onChange={onChangeUrl}
      />
    </Form.Field>
    <Form.Separator>or</Form.Separator>
    <SearchBoxContainer />
    <ResultListContainer />

    <Flex justify="center">
      <Button type="submit">Continue</Button>
    </Flex>
  </Form>
);

export default GifStep;
