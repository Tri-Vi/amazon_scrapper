const express = require('express');
const request = require('request-promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const generateScrapperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`
app.use(express.json());


app.get('/', (req,res)=>{
  console.log(apiKey);
  res.send('Welcome to Amazon Scrapper API');
});

// GET PRODUCT INFO
app.get('/products/:productId', async(req,res)=>{
  const {productId} = req.params;
  const {api_key} = req.query;

  try {
    const response = await request(`${generateScrapperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);
    res.json(JSON.parse(response));
  } catch(error){
    res.json(error);
  }
});

// GET PRODUCT REVIEWS
app.get('/products/:productId/reviews', async(req,res)=> {
  const {productId} = req.params;
  const {api_key} = req.query;

  try {
    const response = await request(`${generateScrapperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);
    res.json(JSON.parse(response));
  } catch(error){
    res.json(error);
  }
})

// GET SEARCH Results
app.get('/search/:searchQuery', async(req,res)=>{
  const { searchQuery } = req.params;
  const {api_key} = req.query;
  try {
    const response = await request(`${generateScrapperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);
    res.json(JSON.parse(response));
  } catch (error){
    res.json(error);
  }
});

app.listen(PORT, (err) =>{
  if(err){
    console.log(err);
  }
  console.log(`Listening on PORT ${PORT}`)
})