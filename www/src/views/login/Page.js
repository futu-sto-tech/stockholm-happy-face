import React from "react";

import Layout from "./styled/Layout";
import Form from "./styled/Form";
import Autocomplete from "./styled/Autocomplete";

const LoginPage = ({
  username,
  onChangeUsername,
  loading,
  onSubmit,
  users,
  onClickUser
}) => (
  <Layout>
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Form.Label>Enter your name</Form.Label>
        <Form.Input
          placeholder="Your name"
          value={username}
          onChange={onChangeUsername}
        />
      </Form.Field>

      {users.length > 0 && (
        <Autocomplete>
          {users.map(user => (
            <Autocomplete.Item key={user.id} onClick={() => onClickUser(user)}>
              {user.name}
            </Autocomplete.Item>
          ))}
        </Autocomplete>
      )}

      <Form.Button>{loading ? "Loading..." : "Login"}</Form.Button>
    </Form>
  </Layout>
);

export default LoginPage;
