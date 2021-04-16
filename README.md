# Smileys by Futurice

Present a GIF to your team and talk about your past week.

[![Sponsored](https://img.shields.io/badge/chilicorn-sponsored-brightgreen.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAMAAADjyg5GAAABqlBMVEUAAAAzmTM3pEn%2FSTGhVSY4ZD43STdOXk5lSGAyhz41iz8xkz2HUCWFFhTFFRUzZDvbIB00Zzoyfj9zlHY0ZzmMfY0ydT0zjj92l3qjeR3dNSkoZp4ykEAzjT8ylUBlgj0yiT0ymECkwKjWqAyjuqcghpUykD%2BUQCKoQyAHb%2BgylkAyl0EynkEzmkA0mUA3mj86oUg7oUo8n0k%2FS%2Bw%2Fo0xBnE5BpU9Br0ZKo1ZLmFZOjEhesGljuzllqW50tH14aS14qm17mX9%2Bx4GAgUCEx02JySqOvpSXvI%2BYvp2orqmpzeGrQh%2Bsr6yssa2ttK6v0bKxMBy01bm4zLu5yry7yb29x77BzMPCxsLEzMXFxsXGx8fI3PLJ08vKysrKy8rL2s3MzczOH8LR0dHW19bX19fZ2dna2trc3Nzd3d3d3t3f39%2FgtZTg4ODi4uLj4%2BPlGxLl5eXm5ubnRzPn5%2Bfo6Ojp6enqfmzq6urr6%2Bvt7e3t7u3uDwvugwbu7u7v6Obv8fDz8%2FP09PT2igP29vb4%2BPj6y376%2Bu%2F7%2Bfv9%2Ff39%2Fv3%2BkAH%2FAwf%2FtwD%2F9wCyh1KfAAAAKXRSTlMABQ4VGykqLjVCTVNgdXuHj5Kaq62vt77ExNPX2%2Bju8vX6%2Bvr7%2FP7%2B%2FiiUMfUAAADTSURBVAjXBcFRTsIwHAfgX%2FtvOyjdYDUsRkFjTIwkPvjiOTyX9%2FAIJt7BF570BopEdHOOstHS%2BX0s439RGwnfuB5gSFOZAgDqjQOBivtGkCc7j%2B2e8XNzefWSu%2BsZUD1QfoTq0y6mZsUSvIkRoGYnHu6Yc63pDCjiSNE2kYLdCUAWVmK4zsxzO%2BQQFxNs5b479NHXopkbWX9U3PAwWAVSY%2FpZf1udQ7rfUpQ1CzurDPpwo16Ff2cMWjuFHX9qCV0Y0Ok4Jvh63IABUNnktl%2B6sgP%2BARIxSrT%2FMhLlAAAAAElFTkSuQmCC)](http://spiceprogram.org/oss-sponsorship)

## Table of contents

- [About the project](#about-the-project)
  - [Built with](#build-with)
  - [Major components](#major-components)
- [Deployment](#deployment)
  - [API and web app](#api-and-web-app)

## About the project

Smileys is a weekly session where team members share the ups and downs from the past week.

It roughly works like this:

1. Use the web app to find a suitable GIF that represents your week
1. On Friday, gather your team and go through everyone's entries

### Built with

- [Vercel](https://vercel.com/) - serverless deployment platform
- [Auth0](https://auth0.com/) - authentication platform
- [Hasura](https://hasura.io/) - GraphQL layer on-top of PostgreSQL

### Major components

The project can be divided into the following pieces:

- GraphQL API

  The shared backend for all clients. Provided by Hasura.

- Web app

  Interface to pick GIFs and host the sharing session.

## Deployment

Follow these instructions to deploy the project. You will need to sign up for a few services to get everything working, however, with basic usage you can stick to the free tiers.

The first thing you need to do is to clone the project.

```bash
git clone https://github.com/futu-sto-tech/stockholm-happy-face
cd stockholm-happy-face
yarn
```

Next, go and sign up for the required services:

- [Giphy](https://developers.giphy.com/dashboard/). Create and app and grab the "API Key".
- [Vercel](https://vercel.com/).
- [Hasura](https://hasura.com/). Either sign up for their managed [Hasura Cloud](https://hasura.io/cloud/) solution or deploy on e.g. [Heroku](https://www.heroku.com/).
- [Auth0](https://auth0.com/). Create a new project.

### Deploy the Next.js web app

I recommend Vercel for deploying the web app. Please refer to the [official docs](https://vercel.com/docs) for specific steps.

You need to provide the following environment variables:

- `GIPHY_API_KEY`. Find it in the [Giphy dashboard](https://developers.giphy.com/dashboard/).
- `HASURA_GRAPHQL_ADMIN_SECRET`. Find it where you host your Hasura deployment.
- `HASURA_GRAPHQL_ENDPOINT`. Find it where you host your Hasura deployment (ex: `futurice-smileys.herokuapp.com/v1/graphql`).
- `NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT`. Find it where you host your Hasura deployment (ex: `futurice-smileys.herokuapp.com/v1/graphql`).
- `NEXT_PUBLIC_GA_TRACKING_ID` (optional). Google Analytics ID (ex: `UA-165689299-1`).
- `NEXT_PUBLIC_AUTH0_DOMAIN`. Find it on the Auth0 dashboard (ex: `smileys.eu.auth0.com`).
- `NEXT_PUBLIC_AUTH0_CLIENT_ID`. Find it on the Auth0 dashboard.

### Setup Auth0

Create a new project. The go to "Applications" and create a new "Single Page Application". Use the "Client ID" for the `NEXT_PUBLIC_AUTH0_CLIENT_ID` environment variable. Use the "Domain" for the `NEXT_PUBLIC_AUTH0_DOMAIN` environment variable.

Find the section "Application URIs". In the "Allowed Callback URLs", based on your web app domain, enter something like:

```
http://localhost:3000, https://smileys-*.vercel.app
```

Use the same value for both "Allowed Logout URLs" and "Allowed Web Origins". Save changes.

Now go to "Auth Pipeline > Rules". Create a new rule. Pick the "Empty rule" template. Use name: "hasura-jwt-claim". In the "Script" field, write:

```js
function (user, context, callback) {
  const namespace = "https://hasura.io/jwt/claims";
  context.idToken[namespace] =
    {
      'x-hasura-default-role': 'user',
      // do some custom logic to decide allowed roles
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.user_id
    };
  callback(null, user, context);
}
```

Save changes. Create another new rule with the "Empty rule" template. Name it "insert-user". Fill in the "Script" field with:

```js
function (user, context, callback) {
  const nickname = user.given_name || user.nickname || user.name;
  const email = user.email;
  const userId = user.user_id;
  const picture = user.picture;

  const query = `
    mutation InsertUser($id: String, $name: String!, $email: String!, $picture: String) {
      insert_user(objects: { id: $id, name: $name, email: $email, picture: $picture, team_id: 1 }) {
        returning {
          id
        }
      }
    }
  `;

  request.post({
      headers: {
        'content-type' : 'application/json',
        'x-hasura-admin-secret': configuration.hasura_admin_secret
      },
      url: configuration.hasura_graphql_endpoint,
      body: JSON.stringify({
        query: query,
        variables: { id: userId, name: nickname, email: email, picture: picture }
      })
  }, function(error, response, body) {
       console.log(body);
       callback(null, user, context);
  });
}
```

Save changes. Now fill in the following under "Settings":

- `hasura_admin_secret`. Your Hasura admin secret.
- `hasura_graphql_endpoint`. Your Hasura GraphQL endpoint (including "https").

For the remainder of the setup, please refer to the [official documentation](https://auth0.com/docs).

### Setup Hasura

I suggest using Hasura Cloud. Create a new project in the [Hasura Cloud dashboard](https://cloud.hasura.io/projects). Then go to the project settings. Use the domain from the "GraphQL API" for the `HASURA_GRAPHQL_ENDPOINT` and `NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT` environment variables. Use the "Admin Secret" for the `HASURA_GRAPHQL_ADMIN_SECRET` environment variable.

The go to "Env vars". Add the following environment variables:

> Remember to replace `{DEPLOYMENT_DOMAIN}` with the domain for your Vercel deployment.

- Key: `MIGRATE_USER_WEBHOOK_URL`, Value: `{DEPLOYMENT_DOMAIN}/api/migrate/user`
- Key: `MIGRATE_ENTRY_WEBHOOK_URL`, Value: `{DEPLOYMENT_DOMAIN}/api/migrate/entry`
- Key: `IMAGE_METADATA_WEBHOOK_URL`, Value: `{DEPLOYMENT_DOMAIN}/api/filldata`
- Key: `GIPHY_REMOTE_SCHEMA_ENDPOINT`, Value: `{DEPLOYMENT_DOMAIN}/api/graphql`

Head over to the [Hasura JWT Config docs](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt.html#generating-jwt-config) to generate the value for the final environment variable:

- Key: `HASURA_GRAPHQL_ADMIN_SECRET`, Value: your JWT config.

Go back to "General" and click "Launch Console". Go to the "Data" tab. Click "Connect database". Fill in your database connection string. It's important that you name your data base "default" under "Database Display Name". Unfortunately it's not possible to use the "Create Heroku Database" option since you can't name the auto-created database.

> The easiest way to setup a PostgreSQL database is to use Heroku.

Now you need to install the Hasura CLI. Please

```bash
yarn global add hasura-cli
```

Inside the repo, run the following command to build up the database:

> Replace `$HASURA_GRAPHQL_ENDPOINT` with your Hasura domain, including "https://".

```bash
hasura migrate apply --endpoint $HASURA_GRAPHQL_ENDPOINT --admin-secret $HASURA_GRAPHQL_ADMIN_SECRET
```

Next, apply the metadata to Hasura:

```bash
hasura metadata apply --endpoint $HASURA_GRAPHQL_ENDPOINT --admin-secret $HASURA_GRAPHQL_ADMIN_SECRET --from-file ./migrations/metadata.yaml
```

That's it!

## Setup local development environment

Create a `.env` inside the root of the repo. You can copy `.env.sample` and fill in the required environment variables. Now you can start the dev server by running:

```bash
yarn dev
```
