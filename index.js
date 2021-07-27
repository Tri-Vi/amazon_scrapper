const express = require('express');
const request = require('request-promise');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req,res)=>{
  res.send('Welcome to Amazon Scrapper API');
});

app.listen(PORT, (err) =>{
  if(err){
    console.log(err);
  }
  console.log(`Listening on PORT ${PORT}`)
})