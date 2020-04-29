const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successfull'))
  .catch((err) => console.log(err));

const tours = JSON.parse(fs.readFileSync('tours-simple.json'));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data succesfully imported in DB');
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data succesfully deleted from DB');
  } catch (error) {
    console.log(error);
  }
};
