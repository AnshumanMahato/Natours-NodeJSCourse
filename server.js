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
    // eslint-disable-next-line no-console
    console.log('DB Connected');
  })
  .catch();

//Server initiation
const port = process.env.PORT;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on ${port}`);
});
