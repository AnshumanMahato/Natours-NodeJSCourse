const app = require('./app');

//Server initiation
const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
