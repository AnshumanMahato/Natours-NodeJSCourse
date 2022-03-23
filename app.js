const fs = require('fs');

const express = require('express');

const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Welcome to the server side' });
// });

// app.post('/', (req, res) => {
//   res.send('You can send data to this route');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const id = tours.length;

  const newTour = {
    id,
    ...req.body,
  };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {

      if (err) return res.status(500).send('Error Occured');

      res.status(201).json({
        status: 'success',
        data: {
          ...newTour,
        },
      });
      
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
