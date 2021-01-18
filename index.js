const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/User');
const School = require('./models/School');
const userRouter = require('./routes/User');
const comments_router = require('./routes/comments');
const favorites_router = require('./routes/favorites.js');
const rating_router = require('./routes/rating');
const schoolRouter = require('./routes/school');
const dbconnect = require('./utils/db');


app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


const buildPath = path.join(__dirname + '/client' + '/build');
console.log(buildPath)
app.use(express.static(buildPath));

app.use('/user',userRouter);
app.use('/school',schoolRouter);

dbconnect();
mongoose.Promise = global.Promise;


// get all schools
app.get('/schools', (req, res, next) => {
    School.find({}).then((school) => {
        res.send(school)
    }).catch(next);
})

//add school
app.post('/schools', (req, res, next) => {
    School.create(req.body).then((school) => {
        res.send(school)
    }).catch(next);
})

// get the closest school
app.get('/closestschools', (req, res, next) => {
    const longitude = parseFloat(req.query.lng);
    const latitude = parseFloat(req.query.lat);
    School.find({
        location: {
            $near: {
                $maxDistance: 5000,
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                }
            }
        }
    }).find((error, results) => {
        if (error) console.log(error);
        res.send(results)
    });
})

// add a comment to a certain school by schoolId 
app.use('/schools/comments', comments_router);

// add a score to the school by schoolId 
app.use('/schools/rating', rating_router);

// add favorites schools list to the user
app.use('/user/favorites', favorites_router.favorites);

// app.get('*', (request, response) => {
// 	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));