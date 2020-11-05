import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { PORT } from './constants/index';
import 'dotenv/config.js';

import connectDatabase from './config/db';
import poll from './routes/poll';
import user from './routes/user';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type'],
  })
);

app.use(`${process.env.BASEURL}/poll`, poll);
app.use(`${process.env.BASEURL}/user`, user);

// app.use(/* errorMiddleware */);

connectDatabase();

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down server due to Unhandled Promise Rejection');
  server.close(() => {
    process.exit(1);
  });
});
