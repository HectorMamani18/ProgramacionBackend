const express = require('express');
const miRouter= require('../routes/index')
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/api', miRouter)

module.exports = app;