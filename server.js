const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const serveIndex = require('serve-index');

const env = process.env.DEVNODE_ENV || 'development';
const port = process.env.DEVPORT || 14000;
const host = process.env.DEVHOST || '0.0.0.0';

const app = express();

app.use(helmet());
app.use(morgan('common'));
app.use('/',express.static('public'));

app.listen(port, host, error => {
  if (error) throw error;
  console.log(`Server environment "${env}".`);
  console.log(`Server listening at ${host}:${port}.`);
});
