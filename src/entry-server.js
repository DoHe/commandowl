import { MongoClient } from 'mongodb';
import { createApp } from './main';

function storeCommandsForCategory(commands, category, store) {
  return new Promise((resolve, reject) => {
    commands
      .then((cmds) => {
        const cmdObj = {};
        cmds.filter((cmd) => cmd.name !== '_id').forEach((cmd) => {
          // eslint-disable-next-line no-underscore-dangle, no-param-reassign
          delete cmd._id;
          Object.assign(cmdObj, cmd);
        });
        store.commit('setCategory', { name: category, commands: cmdObj });
        resolve();
      })
      .catch((err) => reject(err));
  });
}


function readCommands(db, store) {
  return new Promise((resolve, reject) => {
    db.listCollections().toArray()
      .then((categories) => {
        const colls = categories.filter((cat) => ![
          'system.indexes',
          '__variables',
        ].includes(cat.name)).map((cat) => {
          const collection = db.collection(cat.name);
          const commands = collection.find({}).toArray();
          return storeCommandsForCategory(commands, cat.name, store);
        });
        resolve(Promise.all(colls));
      })
      .catch((err) => reject(err));
  });
}

function readVariables(db, store) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('__variables');
    collection.find({}).toArray()
      .then((variables) => {
        store.commit('setVariables', variables);
        resolve();
      })
      .catch((err) => reject(err));
  });
}

// eslint-disable-next-line no-async-promise-executor
export default (context) => new Promise(async (resolve, reject) => {
  await createApp({
    context,
    afterApp({ app, store }) {
      const client = new MongoClient(process.env.VUE_APP_MONGODB_URI);
      client.connect()
        .then(() => client.db(process.env.VUE_APP_MONBODB_DB_NAME))
        .then((db) => Promise.all([readCommands(db, store), readVariables(db, store)]))
        .then(() => {
          // eslint-disable-next-line no-param-reassign
          context.rendered = () => {
            // eslint-disable-next-line no-param-reassign
            context.state = store.state;
          };
          resolve(app);
        })
        .catch((err) => { console.log(err); reject(err); }) // eslint-disable-line no-console
        .finally(() => client.close());
    },
  });
});
