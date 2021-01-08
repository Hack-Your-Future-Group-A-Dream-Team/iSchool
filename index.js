// this is the main entry point for your full app
// it serves your frontend & provides access to your API

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const School = require('./models/School');

const api = require('./api/server');
const { countDocuments } = require('./models/User');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect Mongo DB
mongoose.connect(process.env.MONGOBD_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false}, ()=> console.log('connected to database'));
mongoose.Promise = global.Promise;

MONGOBD_URI = mongodb+srv://Olga:OEKaEKn5hG8haB8M@cluster0.l1fuv.mongodb.net/hyf?retryWrites=true&w=majority


app.use((req, res, next) => {
  console.log(req.method + ': ' + req.path);
  next();
});

app.use('/', express.static(__dirname + '/client/build/'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});

app.use('/api', api);

// get all schools
app.get('/schools', (req, res, next)=>{
  School.find({}).then((school)=>{
    res.send(school)
  }).catch(next);
})

//add school
app.post('/schools', (req, res, next)=>{
  School.create(req.body).then((school)=>{
    res.send(school)
  }).catch(next);
})

// get the closest school
app.get('/closestschools', (req, res, next)=>{
  const longitude = parseFloat(req.query.lng);
  const latitude = parseFloat(req.query.lat);
  School.find({
    location: {
      $near : {
        $maxDistance: 1000,
        $geometry : {
          type : 'Point',
          coordinates:[longitude,latitude]
        }
      }
    }
  }).find((error,results)=>{
    if (error) console.log(error);
    res.send(results)
  });
})

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
