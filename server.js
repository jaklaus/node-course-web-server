const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(`${__dirname}/views/partials`)
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log file.')
    }
  });

  next();
});

// MAINTENANCE MIDDLEWARE
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: "Welcome to the Home page!"
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs');
});

app.get('*', (req, res) => {
  res.render('404.hbs');
});
// make server port dynamic for Heroku deployment from 3000 -> port
app.listen(port, () =>{
  console.log(`Server is working on port ${port}`);
});
