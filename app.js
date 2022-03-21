const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the server side' });
});

app.post('/', (req, res) => {
  res.send('You can send data to this route');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
