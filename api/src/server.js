const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const { PORT } = require("./config");
const {
  getEntry,
  getEntries,
  postEntry,
  deleteEntry,
  getLatestWeek
} = require("./components/entry/views");
const {
  getUsers,
  getUser,
  getUserByEmail,
  postUser,
  putUser
} = require("./components/user/views");

const API_PREFIX = "/api/v1";

const server = express();
server.use(bodyParser.json());
server.use(cors());
server.use(morgan("combined", { immediate: true }));
server.use(morgan("combined"));

server.get(`${API_PREFIX}/week/latest`, getLatestWeek);
server.get(`${API_PREFIX}/entries`, getEntries);
server.get(`${API_PREFIX}/entries/:id`, getEntry);
server.post(`${API_PREFIX}/entries`, postEntry);
server.delete(`${API_PREFIX}/entries/:id`, deleteEntry);
server.get(`${API_PREFIX}/users`, getUsers);
server.get(`${API_PREFIX}/users/email`, getUserByEmail);
server.get(`${API_PREFIX}/users/:id`, getUser);
server.post(`${API_PREFIX}/users`, postUser);
server.put(`${API_PREFIX}/users/:id`, putUser);

server.listen(PORT, error => {
  if (error) throw error;

  console.log(`Server listening on http://localhost:${PORT}`);
});
