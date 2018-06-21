const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'andrius',
    password : '',
    database : 'smart-brain'
  }
});


const app = express();


// const database = {
//   users: [
//     {
//       id: '123',
//       name: 'John',
//       email: 'john@gmail.com',
//       entries: 0,
//       password: 'cookies',
//       joined: new Date()
//     },
//         {
//       id: '124',
//       name: 'Sally',
//       email: 'sally@gmail.com',
//       password: 'bananas',
//       entries: 0,
//       joined: new Date()
//     }
//   ],
//   login: [
//     {
//       id: '987',
//       has: '',
//       email: 'john@gmail.com'
//     }
//   ]
// }

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send(database.users);
})

// signin --> POST = success/fail
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

//register --> POST = user
app.post('/register', (req, res) =>  { register.handleRegister(req, res, db, bcrypt)})

//profile/:userID --> GET = user
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

//image --> PUT --> user
app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


app.listen(process.env.PORT || 3000, () => {
  console.log('app is running on port ${process.env.PORT}');
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT --> user
*/