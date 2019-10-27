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

function isEditCommand(body) {
  const { category, oldCommand, newCommand } = body;
  console.log(category);
  console.log(oldCommand);
  console.log(newCommand);
  return (isCommand({ category, command: oldCommand })
    && isCommand({ category, command: newCommand }));
}

function isCategory(body) {
  const { category } = body;
  if (!category || typeof category !== 'string') {
    return false;
  }
  return true;
}

function errorResponse(err, res, status = 501, message = 'Internal error') {
  console.log(err);
  res.status(status).json({ error: err, message });
}

function insertCommand(client, toInsert) {
  const db = client.db(process.env.VUE_APP_MONBODB_DB_NAME);
  const { category, command } = toInsert;
  const collection = db.collection(category);
  return collection.insertOne({ [command.command]: command });
}

function editCommand(client, toEdit) {
  const db = client.db(process.env.VUE_APP_MONBODB_DB_NAME);
  const { category, newCommand, oldCommand } = toEdit;
  const collection = db.collection(category);
  return collection
    .remove({ [oldCommand.command]: oldCommand }, true)
    .then(() => collection.insertOne({ [newCommand.command]: newCommand }));
}

function deleteCommand(client, toDelete) {
  const db = client.db(process.env.VUE_APP_MONBODB_DB_NAME);
  const { category, command } = toDelete;
  const collection = db.collection(category);
  return collection.remove({ [command.command]: command }, true);
}

function insertCategory(client, toInsert) {
  const db = client.db(process.env.VUE_APP_MONBODB_DB_NAME);
  const { category } = toInsert;
  const collection = db.collection(category);
  return collection.insertOne({});
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
        .then((result) => res.status(200).json({ message: `Added ${result.insertedCount} commands` }))
        .catch((err) => errorResponse(err, res))
        .finally(() => client.close());
    },
  );

  app.post(
    '/edit_command', (req, res) => {
      if (!isEditCommand(req.body)) {
        errorResponse(new Error('invalid command'), res, 422, 'Invalid command');
        return;
      }
      const client = new MongoClient(process.env.VUE_APP_MONGODB_URI);
      client.connect()
        .then(() => editCommand(client, req.body))
        .then((result) => res.status(200).json({ message: `Edited ${result.modifiedCount} commands` }))
        .catch((err) => errorResponse(err, res))
        .finally(() => client.close());
    },
  );

  app.post(
    '/delete_command', (req, res) => {
      if (!isCommand(req.body)) {
        errorResponse(new Error('invalid command'), res, 422, 'Invalid command');
        return;
      }
      const client = new MongoClient(process.env.VUE_APP_MONGODB_URI);
      client.connect()
        .then(() => deleteCommand(client, req.body))
        .then((result) => res.status(200).json({ message: `Deleted ${result.deletedCount} commands` }))
        .catch((err) => errorResponse(err, res))
        .finally(() => client.close());
    },
  );

  app.post(
    '/add_category', (req, res) => {
      if (!isCategory(req.body)) {
        errorResponse(new Error('invalid category'), res, 422, 'Invalid category');
        return;
      }
      const client = new MongoClient(process.env.VUE_APP_MONGODB_URI);
      client.connect()
        .then(() => insertCategory(client, req.body))
        .then((result) => res.status(200).json({ message: `Added ${result.insertedCount} categories` }))
        .catch((err) => errorResponse(err, res))
        .finally(() => client.close());
    },
  );
};
