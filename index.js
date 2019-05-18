const path = require('path');
const fs = require('fs');
const express = require('express');


const app = express();

const PORT = process.env.PORT || 8080;

// EJS Middleware
app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'ejs');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.status(200).render('index', {title: 'Home'});
});

app.get('/about', (req, res) => {
  res.status(200).render('about', {title: 'About'});
});

app.use('/link', require(path.join(__dirname, 'routers', 'link')));

app.get('*', (req, res) => {
  res.status(404).render('404', {title: '404 Error', url: req.url});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
