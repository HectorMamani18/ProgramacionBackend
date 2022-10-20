const {Router} = require('express')
const prodRouter= require('./productos')

const mainRoute = Router();
mainRoute.use('/productos',prodRouter)
module.exports = mainRoute;