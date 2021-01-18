const express = require('express');
const schoolRouter = express.Router();
const School = require('../models/School');


// get specific school

schoolRouter.get('/info', async(req, res, next)=>{
    try {
        const id  = req.query.id;
        School.find({_id: id}).then((school) => {
        res.send(school)
        }).catch(next);
        
    } catch (error) {
        console.error(error);   
    }
})

module.exports = schoolRouter;