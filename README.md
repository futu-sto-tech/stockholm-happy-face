# Smileys App

Choose a GIF to represent how your week has been.

[![Sponsored](https://img.shields.io/badge/chilicorn-sponsored-brightgreen.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAMAAADjyg5GAAABqlBMVEUAAAAzmTM3pEn%2FSTGhVSY4ZD43STdOXk5lSGAyhz41iz8xkz2HUCWFFhTFFRUzZDvbIB00Zzoyfj9zlHY0ZzmMfY0ydT0zjj92l3qjeR3dNSkoZp4ykEAzjT8ylUBlgj0yiT0ymECkwKjWqAyjuqcghpUykD%2BUQCKoQyAHb%2BgylkAyl0EynkEzmkA0mUA3mj86oUg7oUo8n0k%2FS%2Bw%2Fo0xBnE5BpU9Br0ZKo1ZLmFZOjEhesGljuzllqW50tH14aS14qm17mX9%2Bx4GAgUCEx02JySqOvpSXvI%2BYvp2orqmpzeGrQh%2Bsr6yssa2ttK6v0bKxMBy01bm4zLu5yry7yb29x77BzMPCxsLEzMXFxsXGx8fI3PLJ08vKysrKy8rL2s3MzczOH8LR0dHW19bX19fZ2dna2trc3Nzd3d3d3t3f39%2FgtZTg4ODi4uLj4%2BPlGxLl5eXm5ubnRzPn5%2Bfo6Ojp6enqfmzq6urr6%2Bvt7e3t7u3uDwvugwbu7u7v6Obv8fDz8%2FP09PT2igP29vb4%2BPj6y376%2Bu%2F7%2Bfv9%2Ff39%2Fv3%2BkAH%2FAwf%2FtwD%2F9wCyh1KfAAAAKXRSTlMABQ4VGykqLjVCTVNgdXuHj5Kaq62vt77ExNPX2%2Bju8vX6%2Bvr7%2FP7%2B%2FiiUMfUAAADTSURBVAjXBcFRTsIwHAfgX%2FtvOyjdYDUsRkFjTIwkPvjiOTyX9%2FAIJt7BF570BopEdHOOstHS%2BX0s439RGwnfuB5gSFOZAgDqjQOBivtGkCc7j%2B2e8XNzefWSu%2BsZUD1QfoTq0y6mZsUSvIkRoGYnHu6Yc63pDCjiSNE2kYLdCUAWVmK4zsxzO%2BQQFxNs5b479NHXopkbWX9U3PAwWAVSY%2FpZf1udQ7rfUpQ1CzurDPpwo16Ff2cMWjuFHX9qCV0Y0Ok4Jvh63IABUNnktl%2B6sgP%2BARIxSrT%2FMhLlAAAAAElFTkSuQmCC)](http://spiceprogram.org/oss-sponsorship)

## Table of contents

- [About the project](#about-the-project)
  - [Built with](#build-with)
  - [Major components](#major-components)
- [Deployment](#deployment)
  - [API and web app](#api-and-web-app)

## About the project

Smileys is a weekly session where team members share the ups and downs from the past week. This projects aims to complement this idea by adding GIFs in the mix!

It roughly works like this:

1. Use the web app to find a suitable GIF that represents your week
1. On Friday, gather your team and go through everyone's entries in the use the Apple TV app (separate repo)

### Built with

- [Zeit Now](https://zeit.co/now) - serverless deployment
- [Next.js](https://nextjs.org) - React framework
- [MongoDB Atlas][mongodb-atlas] - Managed MongoDB

### Major components

The project can be divided into the following pieces:

- REST API

  The shared backend for all clients. Connects to a MongoDB instance for persistance. It's implemented in Node.js/TypeScript using Next.js API routes.

- Web app

  The web application is a React/Next.js/TypeScript application.

- AppleTV app

  The AppleTV app is used to present all entries from the past week. It's part of a separate repo.

## Deployment

Both the REST API and web app are deployed to a single domain using Next.js. I highly recommend Zeit Now which makes the process painless.

If you want to setup this project yourself - this is the part for you. You will need to sign up for a few services to get everything working, however, with basic usage you can stick to the free tiers.

The first thing you need to do is to clone the project.

```bash
git clone https://github.com/futurice/stockholm-happy-face
cd stockholm-happy-face
```

### API and web app

The REST API and web app are deployed together. Before we start, let's sign up for some services:

1. Go to [MongoDB Atlas][mongodb-atlas] and sign up for an account

1. Go to [Zeit Now][now] and sign up for an account

1. Go to [Giphy][giphy-dev] and generate an API key

1. Next we need to install some dependencies - for this you need Node.js.

   ```bash
   # install the Zeit Now CLI
   yarn global add now

   # install local dependencies
   yarn
   ```

1. Now go to MongoDB Atlas and spin up a new instance and copy the connection string. You can get far just using the free tier.

1. Configure Zeit Now to use our 3rd party service credentials

   ```bash
   now secret add giphy-api-key {GIPHY API KEY}
   now secret add mongo-url {MONGODB CONNECTION STRING}
   now secret add mongo-db-name {MONGODB DATABASE NAME}
   now secret add ga-tracking-id {GOOGLE ANALYTICS ID}
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

[now]: https://zeit.co/now
[giphy-dev]: https://developers.giphy.com/dashboard/
[mongodb-atlas]: https://www.mongodb.com/cloud/atlas
