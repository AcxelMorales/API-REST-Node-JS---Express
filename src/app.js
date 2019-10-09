const express  = require('express');
const morgan   = require('morgan');
const bp       = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('port', process.env.PORT || 3000);

//****************************************************************************
//  MIDDLEWARES
//****************************************************************************
app.use(morgan('tiny'));

app.use(bp.urlencoded({
  extended: false
}));

app.use(bp.json())

//****************************************************************************
//  ROUTES
//****************************************************************************
app.use(require('./routes/app.routes'));

//****************************************************************************
//  LISTENER
//****************************************************************************
app.listen(app.get('port'), () => console.log(`Server online in port: ${app.get('port')}`));4

//****************************************************************************
//  DATABASE
//****************************************************************************
mongoose.connect('mongodb://localhost/cars', {
  useNewUrlParser   : true,
  useUnifiedTopology: true,
  useFindAndModify  : false
})
  .then(()   => console.log('Database online'))
  .catch(err => console.error(err));