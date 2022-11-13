const config = require('config');
const mongoose = require('mongoose');

const mongodbUri = config.get('MONGO_DB.URI');

const options = {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
  dbName: config.get('MONGO_DB.DB_NAME'),
};

const connectDB = mongoose.createConnection(mongodbUri, options);

mongoose.set('debug', config.get('MONGO_DB.DEBUG'));

mongoose.connection.on('error', (error) => console.error(error));

module.exports = { mongoose, connectDB };
