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

If you want to setup this project yourself - this is the part for you. You will need to sign up for a few services to get everything working, however, with basic usage you can stick to the free tiers. The only exception is that you need an Enterprise certificate to distribute the iOS app to your colleagues. It's perfectly possible to skip the native apps though and just use the web app.

The first thing you need to do is to clone the project.

```bash
git clone https://github.com/futurice/stockholm-happy-face
cd stockholm-happy-face
```

### API and web app

The REST API and web app are deployed together. Before we start, let's sign up for some services:

1. Go to [Prisma][prisma] and sign up for an account.

1. Go to [Zeit Now][now] and sign up for an account.

1. Go to [Timber][timber] and sign up for an account.

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

1. Manually update the Prisma "endpoint" config:

   ```yaml
   # /prisma/prisma.yml
   endpoint: YOUR_PRISMA_ENDPOINT_HERE
   datamodel: datamodel.prisma
   ```

1. We are now ready to setup our database in Prisma

   ```bash
   prisma deploy
   ```

   Select "Demo server" when prompted and authenticate with Prisma.

1. Configure Zeit Now to use our 3rd party service credentials

   ```bash
   now secret add giphy-api-key {GIPHY API KEY}
   now secrets add timber-api-key {TIMBER_API_KEY}
   now secrets add timber-source-id {TIMBER_SOURCE_ID}
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

See [API documentation](api/README.md).

[prisma]: https://www.prisma.io
[now]: https://zeit.co/now
[giphy-dev]: https://developers.giphy.com/dashboard/
[timber]: https://timber.io/
