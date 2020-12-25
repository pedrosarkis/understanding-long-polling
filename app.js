const express = require('express');
const app = express();

const basicRoute = require('./routes/index');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use('/', basicRoute);


app.listen(3000);