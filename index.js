const express = require('express');
const request = require('request-promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const apiKey = process.env.apiKey;
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());


app.get('/', (req,res)=>{
  console.log(apiKey);
  res.send('Welcome to Amazon Scrapper API');
});

app.get('/products/:productId', async(req,res)=>{
  const {productId} = req.params;

  try {
    const response = await request(`${baseUrl}&url=https://www.amazon.com/db/${productId}`);
    res.json(JSON.parse(response));
  } catch(error){
    console.log(error);
    res.json(error);
  }
});

app.listen(PORT, (err) =>{
  if(err){
    console.log(err);
  }
  console.log(`Listening on PORT ${PORT}`)
})