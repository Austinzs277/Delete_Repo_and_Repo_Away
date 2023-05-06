import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavigationBar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const TestPage = () => {
  const [foodName, setFoodName] = useState('');
  const [foodData, setFoodData] = useState(null);
  const [serving, setServing] = useState(1);
  const [savedFoods, setSavedFoods] = useState([]);

  useEffect(() => {
    const fetchSavedFoods = async () => {
      const response = await fetch('/foods');
      const data = await response.json();
      setSavedFoods(data);
    };
    fetchSavedFoods();
  }, []);

  const handleServingsChange = (event) => {
    setServing(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const apiKey = '8a3db390b40b467e88258d6974076992';
    const complexSearchUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${foodName}&apiKey=${apiKey}`;
    const complexSearchResponse = await fetch(complexSearchUrl);
    const complexSearchData = await complexSearchResponse.json();
    console.log(complexSearchData);
    const foodId = complexSearchData.results[0].id;
    console.log('id', foodId);
    const nutritionWidgetUrl = `https://api.spoonacular.com/recipes/${foodId}/nutritionWidget.json?apiKey=${apiKey}`;
    const nutritionWidgetResponse = await fetch(nutritionWidgetUrl);

    const nutritionWidgetData = await nutritionWidgetResponse.json();
    console.log('nutritionWidgetData', nutritionWidgetData);
    const foodNutrition = nutritionWidgetData.calories;
    console.log('nutrition', foodNutrition);
    setFoodData({
      name: foodName,
      caloriesPerServing: foodNutrition,
      servingsPerContainer: serving,
    });
  };

  const handleSave = async () => {
    const response = await fetch('/addFood', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: foodName,
        caloriesPerServing: foodData.caloriesPerServing,
        servings: serving,
      }),
    });

    const data = await response.json();
    setSavedFoods([...savedFoods, data]);
    console.log(data);
  };

  const handleDelete = async () => {
    const response = await fetch('/deleteFood', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: foodName,
      }),
    });

    const data = await response.json();
    setSavedFoods([...savedFoods, data]);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="foodName">Enter a food:</label>
        <input
          type="text"
          id="foodName"
          value={foodName}
          onChange={(event) => setFoodName(event.target.value)}
        />
        <button type="submit">Search</button>
        <label>
          Servings:
          <input
            type="number"
            value={serving}
            onChange={handleServingsChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {foodData && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2>{foodData.name}</h2>
            <button onClick={handleDelete} style={{ marginLeft: '10px' }}>
              <span role="img" aria-label="delete">
                🗑️
              </span>
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ marginRight: '10px' }}>Servings:</label>
            <button
              onClick={() => setServing(serving - 1)}
              disabled={serving === 1}
            >
              -
            </button>
            <input
              type="number"
              value={serving}
              onChange={handleServingsChange}
              style={{ margin: '0 10px' }}
            />
            <button onClick={() => setServing(serving + 1)}>+</button>
          </div>
          <p>Calories per serving: {foodData.caloriesPerServing}</p>
          <p>Total calories: {foodData.caloriesPerServing * serving}</p>
          <button onClick={handleSave}>Save food</button>
        </div>
      )}
    </div>
  );
};

export default TestPage;
