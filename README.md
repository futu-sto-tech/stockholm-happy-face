# Smileys App

This project offers a new way to run smileys: with GIFs! This is how it works:

1. You open the web app and paste in a link to a GIF/search for a GIF
1. Submit your weeks smiley entry
1. Wait for Friday...
1. At Smileys; open the companion Apple TV app and select "Random"
1. Go through each entry and share your weeks highlights and learnings

## Parts

The project consists of three pieces:

1. The web app for entering and deleting your weekly smiley entries
1. The Apple TV app for displaying everyone's entries
1. The backend REST API

### 1. Web app

The purpose of the web app is to enable users to submit the weekly GIF entries. You can submit a new GIF as soon as the week starts. You can always log in and delete your current entry and re-submit a new one. You can also see your history of past entries. When you first use the app you enter your user name and subsequently, you simply type the same user name to log in to the app. No additional authentication is currently in place.

Technically, the web app is based on React and bootstrapped with `create-react-app`. It's built and deployed as a static PWA. It is setup to call the backend on the same domain.

### 2. Apple TV app

See separate repo.

### 3. REST API

The REST API is used by both clients. It's built around a service called Prisma.

## Deployment

These are the instructions to deploy the service. First let's get some free accounts.

1. Go to [Prisma][prisma] and sign up for a free account. You can simply login with your GitHub credentials.

1. Install the Prisma CLI

   ```bash
   npm install -g prisma
   ```

1. Finally we are gonna use [now][now] to deploy our services.

   You can first test that everything is working by running `now` locally:

   ```bash
   now dev
   ```

   When you are ready to deploy, run:

   ```bash
   now
   ```

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

[prisma]: https://www.prisma.io
[now]: https://zeit.co/now
