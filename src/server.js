const { MongoClient } = require('mongodb');
const express = require('express');

function isCommand(body) {
  const { category, command } = body;
  if (!category || !command) {
    return false;
  }
  if (!command.command) {
    return false;
  }
  return true;
}

function errorResponse(err, res, status = 501, message = 'Internal error') {
  console.log(err);
  res.status(status).json({ error: err, message });
}

function insertCommand(client, toInsert) {
  const db = client.db('commandowl');
  const { category, command } = toInsert;
  const collection = db.collection(category);
  return collection.insertOne({ [command.command]: command });
}

module.exports.extendServer = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.post(
    '/add_command', (req, res) => {
      if (!isCommand(req.body)) {
        errorResponse(new Error('invalid command'), res, 422, 'Invalid command');
        return;
      }
      const client = new MongoClient(process.env.VUE_APP_MONGODB_URI);
      client.connect()
        .then(() => insertCommand(client, req.body))
        .then(result => res.status(200).json({ message: `Added ${result.insertedCount} commands` }))
        .catch(err => errorResponse(err, res))
        .finally(() => client.close());
    },
  );
};
