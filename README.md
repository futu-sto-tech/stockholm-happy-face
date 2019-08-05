# Smileys App

Choose a GIF to represent how your week has been.

## Table of contents

- [About the project](#about-the-project)
  - [Built with](#build-with)
  - [Major components](#major-components)
- [Deployment](#deployment)
  - [API and web app](#api-and-web-app)

## About the project

Smileys is a weekly session where team members share the ups and downs from the past week. This projects aims to complement this idea by adding GIFs in the mix!

It roughly works like this:

1. Use the native/web app to find a suitable GIF that represents your week
1. On Friday, gather your team and go through everyone's entries in the use the Apple TV app (separate repo)

### Built with

- [Zeit Now](https://zeit.co/now) - serverless deployment
- [Expo](https://expo.io/) - managed React Native workflow
- [Prisma](https://www.prisma.io) - database
- [Next.js](https://nextjs.org) - React framework

### Major components

The project can be divided into the following:

- REST API

  The shared backend for all clients. Uses Prisma to interact with the database. It's deployed using Zeit Now and each endpoint runs as a serverless function. Everything is implemented in Node.js.

- Native apps - iOS and Android

  The native clients are implemented in React Native in the managed Expo workflow. The same codebase is shared between both platforms.

- Web app

  The web application is a React/Next.js application. It aims to offer the same features as the native apps. It's deployed using Zeit Now on the same domain.

- AppleTV app

  The AppleTV app is used to present all entries from the past week. It's part of a separate repo.

## Deployment

If you want to setup and use this project for your own team - this is the part for you. In order to run all the services, you will need to sign up for a few services. However, with basic usage you can stick to the free tiers. The only exception is that you will need an Enterprise certificate to distribute the iOS app.

The first thing you need to do is to clone the project.

```bash
git clone https://github.com/futurice/stockholm-happy-face
cd stockholm-happy-face
```

### API and web app

The REST API and web app are deployed together. Before we start, let's sign up for some services:

1. Go to [Prisma][prisma] and sign up for an account.

1. Go to [Zeit Now][now] and sign up for an account.

1. Go to [Giphy][giphy-dev] and generate an API key.

1. Next we need to install some dependencies - for this you need Node.js.

   ```bash
   # install the Prisma CLI
   npm install -g prisma

   # install the Zeit Now CLI
   npm install -g now

   # install dependencies for the API and web app
   npm install --prefix ./api
   npm install --prefix ./next
   ```

1. We are now ready to setup our database in Prisma

   ```bash
   prisma deploy
   ```

   Select "Demo server" when prompted and authenticate with Prisma.

1. Configure Zeit Now to use our Giphy credentials

   ```bash
   now secret add giphy-api-key {GIPHY API KEY}
   ```

1. Finally, we are gonna use [Zeit Now][now] to deploy our services.

   You can test that everything works by testing it locally:

   ```bash
   now dev
   ```

   When you are ready to deploy, run:

   ```bash
   now
   ```

   This will give you a unique deployment URL that you can use to access the services over HTTP.

## Documentation

### REST API

- `GET /api/users`

  List users in the database.

  **URL parameter**: `query=[string]` where `query` is a string to query users by "name".

  **Success Response: 200**

  ```json
  [
    {
      "id": "jja89wdj98ajdwj2198jd",
      "name": "Eric",
      "createdAt": "2019-04-07T10:54:53.629Z",
      "updatedAt": "2019-07-24T08:05:08.998Z",
      "expoPushToken": "ExponentPushToken[k09kkd0aw9aw0d9a0w8ad]"
    },
    {
      "id": "dawiaiwdja98w98ajwoaiw",
      "name": "Patricia",
      "createdAt": "2019-02-07T10:54:53.629Z",
      "updatedAt": "2019-10-24T08:05:08.998Z",
      "expoPushToken": null
    }
  ]
  ```

- `GET /api/users/:id`

  Fetch a user by ID.

  **Success Response: 200**

  ```json
  {
    "id": "dawiaiwdja98w98ajwoaiw",
    "name": "Patricia",
    "createdAt": "2019-02-07T10:54:53.629Z",
    "updatedAt": "2019-10-24T08:05:08.998Z",
    "expoPushToken": null
  }
  ```

- `GET /api/users/name/:name`

  Fetch a user by name.

  **Success Response: 200**

  ```json
  {
    "id": "dawiaiwdja98w98ajwoaiw",
    "name": "Patricia",
    "createdAt": "2019-02-07T10:54:53.629Z",
    "updatedAt": "2019-10-24T08:05:08.998Z",
    "expoPushToken": null
  }
  ```

- `POST /api/users`

  Create a new user in the database.

  **Data example**

  ```json
  {
    "name": "Paul"
  }
  ```

  **Success Response: 200**

  ```json
  {
    "id": "jaw98djwd89ajwd89a98wdj",
    "name": "Paul",
    "createdAt": "2019-02-07T10:54:53.629Z",
    "updatedAt": "2019-10-24T08:05:08.998Z",
    "expoPushToken": null
  }
  ```

- `PUT /api/users/:id`

  Update a user with a new Expo push notification token.

  **Data example**

  ```json
  {
    "expoPushToken": "ExponentPushToken[k09kkd0aw9aw0d9a0w8ad]"
  }
  ```

  **Success Response: 200**

  ```json
  {
    "id": "jaw98djwd89ajwd89a98wdj",
    "name": "Paul",
    "createdAt": "2019-02-07T10:54:53.629Z",
    "updatedAt": "2019-10-26T08:05:08.998Z",
    "expoPushToken": "ExponentPushToken[k09kkd0aw9aw0d9a0w8ad]"
  }
  ```

- `GET /api/entries`

  List entries in the database.

  **URL parameter**: `user=[string]` where `user` is the unique user ID to filter entries by user.

  **URL parameter**: `name=[string]` where `name` is the unique user name to filter entries by user.

  **URL parameter**: `week=[integer|"current"]` where `week` the iso week number or "current" to filter entries by week of submission.

  **Success Response: 200**

  ```json
  [
    {
      "id": "cjud2cbs9ccvy0b92ib3cnk8d",
      "createdAt": "2019-04-11T19:56:22.569Z",
      "updatedAt": "2019-04-11T19:56:22.569Z",
      "user": {
        "id": "jaw98djwd89ajwd89a98wdj",
        "name": "Paul"
      },
      "gif": {
        "id": "cjud2cbscccvz0b92mya4jbmd",
        "giphyId": "ycCorcEg3i946QRkAQ",
        "url": "https://media0.giphy.com/media/ycCorcEg3i946QRkAQ/giphy.gif",
        "height": "480",
        "width": "480"
      },
      "fromNow": "4 months ago",
      "week": 15
    },
    {
      "id": "cjudw0yht398c0b26a568w32i",
      "createdAt": "2019-04-12T09:47:20.609Z",
      "updatedAt": "2019-04-12T09:47:20.609Z",
      "user": {
        "id": "dawiaiwdja98w98ajwoaiw",
        "name": "Patricia"
      },
      "gif": {
        "id": "cjudw0yhz398d0b26axrrctc7",
        "giphyId": null,
        "url": "https://media.giphy.com/media/uyWTOgNGGWfks/giphy.gif",
        "height": null,
        "width": null
      },
      "fromNow": "4 months ago",
      "week": 15
    }
  ]
  ```

- `GET /api/entries/:id`

  Fetch a single entry.

  **Success Response: 200**

  ```json
  {
    "id": "cjudw0yht398c0b26a568w32i",
    "createdAt": "2019-04-12T09:47:20.609Z",
    "updatedAt": "2019-04-12T09:47:20.609Z",
    "user": {
      "id": "dawiaiwdja98w98ajwoaiw",
      "name": "Patricia"
    },
    "gif": {
      "id": "cjudw0yhz398d0b26axrrctc7",
      "giphyId": null,
      "url": "https://media.giphy.com/media/uyWTOgNGGWfks/giphy.gif",
      "height": null,
      "width": null
    },
    "fromNow": "4 months ago",
    "week": 15
  }
  ```

- `POST /api/entries`

  Create a new entry for a user.

  **Example data**

  ```json
  {
    "user": "dawiaiwdja98w98ajwoaiw",
    "gif": {
      "url": "https://media.giphy.com/media/uyWTOgNGGWfks/giphy.gif"
    }
  }
  ```

  **Success Response: 200**

  ```json
  {
    "id": "cjudw0yht398c0b26a568w32i",
    "createdAt": "2019-04-12T09:47:20.609Z",
    "updatedAt": "2019-04-12T09:47:20.609Z",
    "user": {
      "id": "dawiaiwdja98w98ajwoaiw",
      "name": "Patricia"
    },
    "gif": {
      "id": "cjudw0yhz398d0b26axrrctc7",
      "giphyId": null,
      "url": "https://media.giphy.com/media/uyWTOgNGGWfks/giphy.gif",
      "height": null,
      "width": null
    },
    "fromNow": "4 months ago",
    "week": 15
  }
  ```

- `DELETE /api/entries/:id`

  Delete an entry from the database.

  **Success Response: 200**

  ```json
  {
    "id": "cjudw0yht398c0b26a568w32i",
    "createdAt": "2019-04-12T09:47:20.609Z",
    "updatedAt": "2019-04-12T09:47:20.609Z",
    "user": {
      "id": "dawiaiwdja98w98ajwoaiw",
      "name": "Patricia"
    },
    "gif": {
      "id": "cjudw0yhz398d0b26axrrctc7",
      "giphyId": null,
      "url": "https://media.giphy.com/media/uyWTOgNGGWfks/giphy.gif",
      "height": null,
      "width": null
    },
    "fromNow": "4 months ago",
    "week": 15
  }
  ```

[prisma]: https://www.prisma.io
[now]: https://zeit.co/now
[giphy-dev]: https://developers.giphy.com/dashboard/
