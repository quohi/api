import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import pino from 'pino';
import pinoHttp from 'pino-http';
import mongoose from 'mongoose';

import index from './routes/index';
import events from './routes/events';

const logger = pinoHttp({
  logger: pino(),
});

const app = express();

mongoose.connect('mongodb://localhost/quohi-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (err: any) => console.error('MongoDB connection error:', err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/events', events);

app.use((req, res) => {
  res.status(404);
  res.json({ error: 'not-found' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({ error: 'unexpected' });
});

export default app;
