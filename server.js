const mongoose = require('mongoose');
require('dotenv').config();

process.on('uncaughtException', err => {
  console.log(`An error occured: ${err.message} `);
  console.log('Shutting Down');
  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('DB Connected');
  });

//Server initiation
const port = process.env.PORT;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on ${port}`);
});

//Unhandled Promise Rejection
process.on('unhandledRejection', err => {
  console.log(`An error occured: ${err.message} `);
  server.close(() => {
    console.log('Shutting Down');
    process.exit(1);
  });
});
