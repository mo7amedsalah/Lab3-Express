const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const client = require('prom-client');

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000 ;
const auth = require('./middleware/auth');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const collectDefaultMetrics = client.collectDefaultMetrics;
const prefix = 'my_application';
collectDefaultMetrics({ prefix });

app.get('/metrics', function (req, res) {
  res.set('Content-Type', client.register.contentType);
  res.end(client.register.metrics());
  });



app.use('/api/users', usersRouter);
app.use('/api/posts', auth, postsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
        res.json({
            message:err.message,
            error: err
        });

});

mongoose.connect('mongodb://localhost:27017/db',{ useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('mongodb started.');
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  }).catch(() => {
    console.log('Mongodb connection failed.');
  })