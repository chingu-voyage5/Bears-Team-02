const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;
const {Server} = require('http')
const server = Server(app)
const db = require('./db/config/database');
const {User,Order_Items, Orders} = require('./db/models/index')
const router = require('./db/api/routes/index');
const bodyparser = require('body-parser');



app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use('/api', router);



server.listen(PORT, (err) => {
  if (err) {
    console.log('There was an error connecting to the Server ', err);
  } else {
    console.log('You have connected to the server on PORT: ', PORT);
    console.log('╔═══════════════════╗');
    console.log('║                   ║');
    console.log('║  Hi!              ║');
    console.log('║    Server         ║');
    console.log('║          is       ║');
    console.log('║            up     ║');
    console.log('╚═══════════════════╝');
    console.log('Bears Backend!!');
  }
});

// User.findAll({
// });

// Catches errors to routes.
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(500).send(error);
});



module.exports = app;
