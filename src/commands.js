import v from './variables';

export default {
  'Bash basics': {
    ls: {
      command: 'ls',
      shortDescription: 'Lists a directory',
      longDescription: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
      exampleInput: 'ls ~',
      exampleOutput: `Bilder     examples.desktop  Musik       python-workspace  Videos
Dokumente  kdenlive          Öffentlich  Schreibtisch      Vorlagen
Downloads  kubernetes        Programme   StudioProjects`,
    },
    cd: {
      command: 'cd',
      shortDescription: 'Change directory',
      longDescription: 'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    },
  },
  Docker: {
    'docker-compose up': {
      command: 'docker-compose up',
      shortDescription: 'Start containers',
    },
  },
  AWS: {
    'aws s3 cp': {
      command: 'aws s3 cp',
      shortDescription: 'Copy a file to s3',
      longDescription: 'Copy a file to s3',
      exampleInput: `AWS_ACCESS_KEY_ID=${v.awsId} AWS_SECRET_ACCESS_KEY=${v.awsKey} aws s3 cp test.txt s3://mybucket/test2.txt`,
      exampleOutput: 'Uploaded file',
    },
  },
};
