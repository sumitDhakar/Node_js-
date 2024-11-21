const express = require('express')
const app = express();
const db=require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get( '/chincken',(req ,res)=>{
    res.send('welcome sir ');
})


  
  

  const personrouts = require('./routes/personrouts');
  app.use('/person',personrouts)

  const menurouts = require('./routes/menurouts');
  app.use('/Menu',menurouts)
app.listen(3000)