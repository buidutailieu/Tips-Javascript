const express = require('express');
// const client = require('./helpers/connection_redis');
const app = express();
const userRoute = require('./routes/user.route');
require('dotenv').config();
// require('./helpers/connection_mongodb');
// const client = require('./helpers/connection_redis');

// client.set('foo', 'anosytick');

// client.get('foo', (err, result) => {
//   if (err) throw createError.BadRequest();

//   console.log(result);
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.send('Home page');
});

app.use('/user', userRoute);

// app.use((req, res, next) => {
//   //   const error = new Error('Not Found');
//   //   error.status = 500;
//   next(createError.NotFound('This route does not exist'));
// });

app.use((err, req, res, next) => {
  res.json({ status: err.status || 500, message: err.message });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
