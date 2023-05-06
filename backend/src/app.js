import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import * as db from './database.js';

const app = express();
app.use(bodyParser.json());

app.post('/addFood', async (req, res) => {
  const { name, caloriesPerServing, servings } = req.body;
  console.log(name, caloriesPerServing, servings);
  const newFood = db.addFoodIntake('Bao', name, servings, caloriesPerServing);

  res.status(200).send(newFood);
});

app.post('/deleteFood', async (req, res) => {
  const { name, caloriesPerServing, servings } = req.body;
  console.log(name, caloriesPerServing, servings);
  const newFood = db.deleteFoodIntake('Bao', name);
  
  res.status(200).send(newFood);
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
