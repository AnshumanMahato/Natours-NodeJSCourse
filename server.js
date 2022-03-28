require('dotenv').config({ path: './config.env' });
const app = require('./app');

//Server initiation
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
