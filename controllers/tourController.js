const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);

  if (!tour) return res.status(404).send('No tours found');

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.addTour = (req, res) => {
  const id = tours.length;

  const newTour = {
    id,
    ...req.body,
  };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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
};

exports.updateTour = (req, res) => {
  // const tour = tours.index();

  // if (!tour) return res.status(404).send('No tours found');

  res.status(200).json({
    status: 'success',
    // data: {
    //   tour,
    // },
  });
};

exports.deleteTour = (req, res) => {
  // const tour = tours.index();

  // if (!tour) return res.status(404).send('No tours found');

  res.status(200).json({
    status: 'success',
    // data: {
    //   to
    // },
  });
};
