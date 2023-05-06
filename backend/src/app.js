import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import * as db from './database.js';

const app = express();
app.use(bodyParser.json());

// search food and get information from API
app.post('/searchFood', async (req, res) => {
  const foodName = req.body.foodName
  const foodInfo = await db.searchFood(foodName)
  console.log("app.js -> search food info: ", foodInfo);
  res.status(200).send(foodInfo);
});

app.post('/selectAllFood', async (req, res) => {
  const username = req.body.username
  const allFood = await db.getAllFoodIntake(username)
  console.log("app.js -> show the user all the food: ", allFood)
  res.status(200).send(allFood);
});

app.post('/addFood', async (req, res) => {
  const username = req.body.username
  const foodName = req.body.foodName
  const calories = req.body.calories
  const state = db.addFoodIntake(username, foodName, calories);
  if (state) {
    res.status(200).send("app.js -> successfully create food to firestore")
  } else {
    res.status(400).send("cannot add food to firestore")
  }
});

app.post('/deleteFood', async (req, res) => {
  const username = req.body.username
  const foodName = req.body.foodName
  const state = db.deleteFood(username, foodName);
  if (state) {
    res.status(200).send("app.js -> successfully delete")
  } else {
    res.status(400).send("fail to delete food from firestore")
  }
});

app.post('/updateFood', async (req, res) => {
  const username = req.body.username
  const foodName = req.body.foodName
  const update = req.body.update
  const state = db.updateFood(username, foodName, update);
  if (state) {
    res.status(200).send("app.js -> successfully update the food")
  } else {
    res.status(400).send('app.js -> fail to update food')
  }
});

// reviews
app.post('/reviews', async (req, res) => {
  const { reviews } = req.body;
  console.log('in reviews', reviews);
  db.addReview(reviews);
  const newReview = await db.getReview();
  res.status(200).send({ reviews: newReview });
});

app.get('/reviews', async (req, res) => {
  console.log('in get review');
  const reviews = await db.getReview();
  console.log('after getting reviews');
  res.status(200).send({ reviews: reviews });
});

export default app;
