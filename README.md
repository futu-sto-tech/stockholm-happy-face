# stockholm-happy-face
👻-mode for now 😉

## Rest API

- Prefix: /api/v1

### User

"Users" represent end users of the app. Users can additionally have a role which will determine authorization level in the app.

- `GET /users`: List users of the app.

- `GET /users/email`: Find a specific user by email.

  Use as `GET /users/email?email=paul.anderson@magnolia.com`.

- `GET /users/email/:id`: Fetch a user by ID.

- `POST /users`: Create a new user.

  The body should contain the following fields:

  ```json
  {
    "name": "Paul Anderson",
    "email": "paul.anderson@magnolia.com",
    "avatar": "http://www.example.com/some.jpg"
  }
  ```

- `PUT /users/:id`: Update an existing user.

  The fields that can be updated include:

  ```json
  {
    "nickname": "Pauly"
  }
  ```

  > If you pass "nickname" as "RANDOM", the API will assign a random nickname to the user.


### Entry

Entries represent the smilies per week and user.

- `GET /entries`: List and filter all entries.

  Query params:

  . `?userName=Paul Anderson`: filter by user.

- `GET /entries/:id`: Fetch a single entry.

- `POST /entries`: Create a new entry.

  The body should contain the following fields:

  ```json
  {
    "userId": "iowe8awe9aweo",
    "link": null,
    "text": "🤔"
  }
  ```

  Each entry should contain _either_ a link to an image (jpg, png, gif) or a text string.

- `DELETE /entries/:id`: Delete an existing entry.
