'use strict';

const axios = require('axios');

const newApiClient = axios.create({ baseURL: 'http://localhost:3000/api/' });

async function addEntry(entry) {
  const urlName = encodeURIComponent(entry.user.name);
  try {
    const url = `/users?query=${urlName}`;
    const response = await newApiClient.get(url);
    const matchingUsers = response.data.filter(item => item.name === entry.user.name);
    const user = matchingUsers.length === 1 ? matchingUsers[0] : undefined;
    if (user) {
      const postResponse = await newApiClient.post(`/entries`, {
        userId: user.id,
        url: entry.gif.url,
        createdAt: entry.createdAt,
      });
      console.log('created entry');
      console.log(postResponse.data);
    }
  } catch (error) {
    console.log(`error | ${entry.user.name} | ${entry.id} | ${error}`);
    console.log(error.response && error.response.data);
  }
}

async function addUser(name) {
  const urlName = encodeURIComponent(name);
  try {
    const url = `/users?query=${urlName}`;
    const response = await newApiClient.get(url);
    const names = response.data.map(item => item.name);
    if (!names.includes(name)) {
      const postResponse = await newApiClient.post(`/users`, { name });
      console.log('created user');
      console.log(postResponse.data);
    }
  } catch (error) {
    console.log(`error | ${name} | ${error}`);
    console.log(error.response && error.response.data);
  }
}

async function mainUsers() {
  const response = await axios.get('https://smileys.futurice.com/api/users');
  const promises = response.data.map(user => addUser(user.name));
  await Promise.all(promises);
}

async function mainEntries() {
  const response = await axios.get('https://smileys.futurice.com/api/entries');
  for (const item of response.data) {
    console.log(item.id);
    await addEntry(item);
  }
}

(async function() {
  await mainUsers();
  await mainEntries();
})();
