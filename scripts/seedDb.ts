import { Event } from '../src/models/event';

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
const mongoUrl = userArgs[0];

const mongoose = require('mongoose');
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', (err: any) => console.error('MongoDB connection error:', err));

function createEvent(name, date, lat, long) {
  const data = {
    name,
    date,
    location: {
      type: 'Point',
      coordinates: [lat, long],
    },
  };

  const event = new Event(data);

  return event
    .save()
    .then((result) => {
      console.log('New Event: ', result);
    })
    .catch((error) => {
      console.log('creat event error', error);
    });
}

function deleteEvents() {
  return Event.remove({});
}

function createAllEvents() {
  const p1 = createEvent('25 de Abril', '1974/04/25', '38.7117769', '-9.1409898');

  return Promise.all([p1]);
}

deleteEvents()
  .then(() => {
    return createAllEvents();
  })
  .then(() => {
    mongoose.connection.close();
  })

  .catch((error) => {
    console.log('error', error);
    return error;
  });
