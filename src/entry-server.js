import { MongoClient } from 'mongodb';
import { createApp } from './main';

const ls = {
  command: 'ls',
  shortDescription: 'Lists a directory',
  longDescription: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
  exampleInput: 'ls ~',
  exampleOutput: `Bilder     examples.desktop  Musik       python-workspace  Videos
Dokumente  kdenlive          Öffentlich  Schreibtisch      Vorlagen
Downloads  kubernetes        Programme   StudioProjects`,
};

export default context => new Promise(async (resolve) => {
  const client = new MongoClient(process.env.VUE_APP_MONGODB_URI);
  client.connect((err) => {
    console.log(`error:${err}`);
    console.log('Connected successfully to server');

    const db = client.db('commandowl');

    const collection = db.collection('commands');
    /* collection.insert({ ls }, (err2, result) => {
      console.log(err2);
      console.log(`Inserted ${result.result.n} documents into the collection`);
    }); */
    collection.find({}).toArray((err3, docs) => {
      console.log(err3);
      console.log('Found the following records');
      console.log(docs);
    });
    client.close();
  });
  await createApp({
    context,
    afterApp({ app, store }) {
      // eslint-disable-next-line no-param-reassign
      context.rendered = () => {
        // eslint-disable-next-line no-param-reassign
        context.state = store.state;
      };
      resolve(app);
    },
  });
});
