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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'Atour must have a price']
  },
  rating: {
    type: Number,
    default: 4.5
  }
});

const Tour = mongoose.model('Tour', tourSchema);

//Server initiation
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
