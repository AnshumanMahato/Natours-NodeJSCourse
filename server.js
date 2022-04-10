const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });
const app = require('./app');

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected');
  })
  .catch();

//Server initiation
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
