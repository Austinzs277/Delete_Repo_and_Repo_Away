import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import * as db from './database.js';

const app = express();
app.use(bodyParser.json());

app.post('/foods', async (req, res) => {
  console.log('in app post foods');
  console.log(req.body);
  const { name, caloriesPerServing, servings } = req.body;
  console.log(name, caloriesPerServing, servings);
  const newFood = db.addFoodIntake('Bao', name, servings, caloriesPerServing);

  res.status(200).send(newFood);
});

app.post('/deleteFoods', async (req, res) => {
  console.log('in app post foods');
  console.log(req.body);
  const { name, caloriesPerServing, servings } = req.body;
  console.log(name, caloriesPerServing, servings);
  const newFood = db.deleteFoodIntake('Bao', name);

  res.status(200).send(newFood);
});

export default app;
