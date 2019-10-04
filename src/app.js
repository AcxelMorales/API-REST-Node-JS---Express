const express = require('express');
const morgan  = require('morgan');
const bp      = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('tiny'));

app.use(bp.urlencoded({
  extended: false
}));

app.use(bp.json())

app.use(require('./routes/app.routes'));

app.listen(app.get('port'), () => {
  console.log(`Server only in port: ${app.get('port')}`);
});
