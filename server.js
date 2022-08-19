const serverless = require('serverless-http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()

const corsOptions = {
   origin: [
      'https://localhost:3000',
      'http://192.168.0.45:3000',
      'http://quiz-app-public.s3-website.eu-west-1.amazonaws.com'
   ],
   exposedHeaders: ['Content-Type', 'Location', 'x-amzn-requestid'],
   optionsSuccessStatus: 200 
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Configure API routes through Express app
require('./app/routes')(app)

// Last step error handling, for any unhandled errors that escape
app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === 'UnauthorizedError') return res.status(err.status || 401).send({message:err.message})
  return res.sendStatus(500)
})


module.exports.handler = serverless(app)