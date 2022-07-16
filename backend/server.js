const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const toyService = require('./services.js/toy.service.bk');
const cors = require('cors');
const port = process.env.PORT || 3030;
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Please work?!');
});

app.get('/api/toy', async (req, res) => {
  // console.log('res main service', res.status(200));
  // console.log('res main statusCode', res.statusCode);
  const toys = await toyService.query();
  res.status(200).send(toys);
});

app.listen(port, () => {
  console.log(`Server is ready at port: http://localhost:${port}/#/`);
});
