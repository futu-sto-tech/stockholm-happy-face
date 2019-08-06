# Smiley REST API

The backend of the Futurice Stockholm Smiley project.

## Tech overview

The solution is based on [Prisma][prisma]. It uses the hosted database solution and the generated client code to support a REST API which exposes all functionality.

## REST API Documentation

<details><summary>GET <code>/api/users</code></summary>
<p>

List users in the database.

**URL parameter**: `query=[string]` where `query` is a string to query users by "name".

**Success Response**: 200

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

</p>
</details>

<details><summary>GET <code>/api/users/:id</code></summary>
<p>

Fetch a user by ID.

**Success Response**: 200

```json
{
  "id": "dawiaiwdja98w98ajwoaiw",
  "name": "Patricia",
  "createdAt": "2019-02-07T10:54:53.629Z",
  "updatedAt": "2019-10-24T08:05:08.998Z",
  "expoPushToken": null
}
```

</p>
</details>

<details><summary>GET <code>/api/users/name/:name</code></summary>
<p>

Fetch a user by name.

**Success Response**: 200

```json
{
  "id": "dawiaiwdja98w98ajwoaiw",
  "name": "Patricia",
  "createdAt": "2019-02-07T10:54:53.629Z",
  "updatedAt": "2019-10-24T08:05:08.998Z",
  "expoPushToken": null
}
```

</p>
</details>

<details><summary>POST <code>/api/users</code></summary>
<p>

Create a new user in the database.

**Data example**: body

```json
{
  "name": "Paul"
}
```

**Success Response**: 200

```json
{
  "id": "jaw98djwd89ajwd89a98wdj",
  "name": "Paul",
  "createdAt": "2019-02-07T10:54:53.629Z",
  "updatedAt": "2019-10-24T08:05:08.998Z",
  "expoPushToken": null
}
```

</p>
</details>

<details><summary>PUT <code>/api/users/:id</code></summary>
<p>

Update a user with a new Expo push notification token.

**Data example**: body

```json
{
  "expoPushToken": "ExponentPushToken[k09kkd0aw9aw0d9a0w8ad]"
}
```

**Success Response**: 200

```json
{
  "id": "jaw98djwd89ajwd89a98wdj",
  "name": "Paul",
  "createdAt": "2019-02-07T10:54:53.629Z",
  "updatedAt": "2019-10-26T08:05:08.998Z",
  "expoPushToken": "ExponentPushToken[k09kkd0aw9aw0d9a0w8ad]"
}
```

</p>
</details>

<details><summary>GET <code>/api/entries</code></summary>
<p>

List entries in the database.

**URL parameter**: `user=[string]` where `user` is the unique user ID to filter entries by user.

**URL parameter**: `name=[string]` where `name` is the unique user name to filter entries by user.

**URL parameter**: `week=[integer|"current"]` where `week` the iso week number or "current" to filter entries by week of submission.

**Success Response**: 200

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

</p>
</details>

<details><summary>GET <code>/api/entries/:id</code></summary>
<p>

Fetch a single entry.

**Success Response**: 200

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

</p>
</details>

<details><summary>POST <code>/api/entries</code></summary>
<p>

Create a new entry for a user.

**Example data**: body

```json
{
  "user": "dawiaiwdja98w98ajwoaiw",
  "gif": {
    "url": "https://media.giphy.com/media/uyWTOgNGGWfks/giphy.gif"
  }
}
```

**Success Response**: 200

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

</p>
</details>

<details><summary>DELETE <code>/api/entries/:id</code></summary>
<p>

Delete an entry from the database.

**Success Response**: 200

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

</p>
</details>

<details><summary>GET <code>/api/gif/search</code></summary>
<p>

Search for GIFs using a keyword.

**URL parameter**: `query=[string]` where `query` is the keyword for searching GIFs.

**URL parameter**: `offset=[integer]` where `offset` is the number of results to skip (default: 0).

**Success Response**: 200

```json
{
  "images": [
    {
      "id": "dzaUX7CAG0Ihi",
      "title": "moving pictures hello GIF",
      "preview": {
        "width": "99",
        "height": "53",
        "url": "https://media1.giphy.com/media/dzaUX7CAG0Ihi/giphy-preview.gif"
      },
      "original": {
        "width": "410",
        "height": "220",
        "url": "https://media1.giphy.com/media/dzaUX7CAG0Ihi/giphy.gif"
      }
    }
  ]
}
```

</p>
</details>

<details><summary>POST <code>/api/notifications/push</code></summary>
<p>

Send push notifications to all users that have opted in.

The message includes a notice that it's time to submit your GIF of the week.

**Success Response**: 200

```json
{
  "status": "ok"
}
```

</p>
</details>

[prisma]: https://www.prisma.io
