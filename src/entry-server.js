import { MongoClient } from 'mongodb';
import { createApp } from './main';

function storeCommandsForCategory(commands, category, store) {
  return new Promise((resolve, reject) => {
    commands
      .then((cmds) => {
        const cmdObj = {};
        cmds.filter(cmd => cmd.name !== '_id').forEach((cmd) => {
          // eslint-disable-next-line no-underscore-dangle, no-param-reassign
          delete cmd._id;
          Object.assign(cmdObj, cmd);
        });
        store.commit('setCategory', { name: category, commands: cmdObj });
        resolve();
      })
      .catch(err => reject(err));
  });
}


function readCommands(db, store) {
  return new Promise((resolve, reject) => {
    db.listCollections().toArray()
      .then((categories) => {
        const colls = categories.map((cat) => {
          const collection = db.collection(cat.name);
          const commands = collection.find({}).toArray();
          return storeCommandsForCategory(commands, cat.name, store);
        });
        resolve(Promise.all(colls));
      })
      .catch(err => reject(err));
  });
}

export default context => new Promise(async (resolve, reject) => {
  await createApp({
    context,
    afterApp({ app, store }) {
      const client = new MongoClient(process.env.VUE_APP_MONGODB_URI);
      client.connect()
        .then(() => client.db())
        .then(db => readCommands(db, store))
        .then(() => {
          // eslint-disable-next-line no-param-reassign
          context.rendered = () => {
            // eslint-disable-next-line no-param-reassign
            context.state = store.state;
          };
          resolve(app);
        })
        .catch((err) => { console.log(err); reject(err); })
        .finally(() => client.close());
    },
  });
});
