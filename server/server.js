import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

import { PORT } from './constants/index.js';
import 'dotenv/config.js';

import errorMiddleware from './middleware/errors.js';
import connectDatabase from './config/db.js';

import poll from './routes/poll.js';
import user from './routes/user.js';
import auth from './routes/auth.js';
import pollExecution from './routes/pollExecution.js';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.get(`${process.env.BASEURL}/csrf-token`, (req, res) => {
  res.status(200).json({ data: req.csrfToken() });
});

app.use(`${process.env.BASEURL}/polls`, poll);
app.use(`${process.env.BASEURL}/users`, user);
app.use(`${process.env.BASEURL}/execution`, pollExecution);
app.use(`${process.env.BASEURL}/`, auth);

app.use(errorMiddleware);

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
