# Smiley REST API

The backend of the Futurice Stockholm Smiley project.

## Tech overview

The solution is base on Next.js API routes. It uses a MongoDB database for persistance. A REST API exposes all functionality.

## Authentication

The API does not enforce any authentication at this point. I might consider adding it at some point.

## REST API Documentation

<details><summary>GET <code>/api/users</code></summary>
<p>

List users in the database.

**URL parameter**: `query=[string]` where `query` is a string to query users by "name".

**Success Response**: 200

```json
[
  {
    "id": "5e282aa29b52422c1654178d",
    "name": "Eric",
    "createdAt": "2019-04-07T10:54:53.629Z"
  },
  {
    "id": "5e282aa29b52422c165417a4",
    "name": "Patricia",
    "createdAt": "2019-02-07T10:54:53.629Z"
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
  "id": "5e282aa29b52422c165417a4",
  "name": "Patricia",
  "createdAt": "2019-02-07T10:54:53.629Z"
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
    "id": "5e2ae7ad3b29dc00071e869d",
    "createdAt": "2019-04-11T19:56:22.569Z",
    "updatedAt": "2019-04-11T19:56:22.569Z",
    "images": {
      "giphyId": "euyLJkWydUslG",
      "original": {
        "url": "https://media3.giphy.com/media/euyLJkWydUslG/giphy.gif"
      },
      "preview": {
        "url": "https://media1.giphy.com/media/euyLJkWydUslG/giphy-preview.gif"
      }
    },
    "user": {
      "id": "5e223aa19b05942c16541766",
      "name": "patricia"
    },
    "fromNow": "3 days ago",
    "week": 4,
    "year": 2020
  },
  {
    "id": "5e282b119b52422c16541856",
    "createdAt": "2019-04-12T09:47:20.609Z",
    "updatedAt": "2019-04-12T09:47:20.609Z",
    "user": {
      "id": "dawiaiwdja98w98ajwoaiw",
      "name": "Gavin"
    },
     "images": {
      "original": {
        "url": "https://media.giphy.com/media/QTlV1NoKgzwGo4Uxd3/giphy.gif"
      }
    },
    "fromNow": "4 months ago",
    "week": 40,
    "year": 2019
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
  "id": "5e2ae7ad3b29dc00071e869d",
  "createdAt": "2019-04-11T19:56:22.569Z",
  "updatedAt": "2019-04-11T19:56:22.569Z",
  "images": {
    "giphyId": "euyLJkWydUslG",
    "original": {
      "url": "https://media3.giphy.com/media/euyLJkWydUslG/giphy.gif"
    },
    "preview": {
      "url": "https://media1.giphy.com/media/euyLJkWydUslG/giphy-preview.gif"
    }
  },
  "user": {
    "id": "5e223aa19b05942c16541766",
    "name": "patricia"
  },
  "fromNow": "3 days ago",
  "week": 4,
  "year": 2020
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
  "userId": "dawiaiwdja98w98ajwoaiw",
  "url": "https://media.giphy.com/media/uyWTOgNGGWfks/giphy.gif"
}
```

**Success Response**: 200

```json
{
  "id": "5e282b4b9b52411c165418a9",
  "createdAt": "2019-04-11T19:56:22.569Z",
  "updatedAt": "2019-04-11T19:56:22.569Z",
  "images": {
    "giphyId": "uyWTOgNGGWfks",
    "original": {
      "url": "https://media3.giphy.com/media/uyWTOgNGGWfks/giphy.gif"
    },
    "preview": {
      "url": "https://media1.giphy.com/media/uyWTOgNGGWfks/giphy-preview.gif"
    }
  },
  "user": {
    "id": "dawiaiwdja98w98ajwoaiw",
    "name": "patricia"
  },
  "fromNow": "1 minute ago",
  "week": 6,
  "year": 2019
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
  "id": "5e282b4b9b52411c165418a9",
  "createdAt": "2019-04-11T19:56:22.569Z",
  "updatedAt": "2019-04-11T19:56:22.569Z",
  "images": {
    "giphyId": "uyWTOgNGGWfks",
    "original": {
      "url": "https://media3.giphy.com/media/uyWTOgNGGWfks/giphy.gif"
    },
    "preview": {
      "url": "https://media1.giphy.com/media/uyWTOgNGGWfks/giphy-preview.gif"
    }
  },
  "user": {
    "id": "dawiaiwdja98w98ajwoaiw",
    "name": "patricia"
  },
  "fromNow": "1 minute ago",
  "week": 6,
  "year": 2019
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
