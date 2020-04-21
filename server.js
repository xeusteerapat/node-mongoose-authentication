const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./routes/router');
const { mongoURI } = require('./config');

mongoose.connect(mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const app = express();

const PORT = process.env.PORT || 3090;

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

const server = http.createServer(app);
server.listen(PORT);
console.log(`Server listening on: ${PORT}`);
