const { connect } = require('mongoose');
require('dotenv').config();
require('colors');

const app = require('./app');

const { DB_HOST, PORT } = process.env;

connect(DB_HOST)
  .then((db) => {
    console.log(
      `Database connection successful. Port: ${db.connection.port}. Name: ${db.connection.name}. Host: ${db.connection.host}`
        .blue.italic.bold
    );
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`.green.italic.bold);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`.red.italic.bold);
    process.exit(1);
  });
