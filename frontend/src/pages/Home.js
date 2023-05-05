import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../components/NavigationBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { getCookie } from '../components/GetCookie';
import 'firebase/compat/auth';

/** Style */
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function HomePage() {
  const classes = useStyles();
  /*
    // get user's log in status
    const location = useLocation();
    console.log(location);
    */

  // initialize the user's status as not logged in
  const [user, setUser] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [foodData, setFoodData] = useState(null);
  const [serving, setServing] = useState(1);
  const [savedFoods, setSavedFoods] = useState([]);
  // access the cookie to check login info
  const user_email = getCookie('user_email');

  useEffect(() => {
    if (user_email) {
      setUser(true);
    }
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    /** TODO: implement the GET API to search for food */

    const apiKey = '8a3db390b40b467e88258d6974076992';
    const complexSearchUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${foodName}&apiKey=${apiKey}`;
    const complexSearchResponse = await fetch(complexSearchUrl);
    const complexSearchData = await complexSearchResponse.json();
    console.log(complexSearchData);
    const foodId = complexSearchData.results[0].id;
    const nutritionWidgetUrl = `https://api.spoonacular.com/recipes/${foodId}/nutritionWidget.json?apiKey=${apiKey}`;
    const nutritionWidgetResponse = await fetch(nutritionWidgetUrl);

    const nutritionWidgetData = nutritionWidgetResponse.json();
    console.log('nutritionWidgetData', nutritionWidgetData);
    const foodNutrition = nutritionWidgetData.calories;
    console.log('nutrition', foodNutrition);
    setFoodData({
      name: foodName,
      caloriesPerServing: foodNutrition,
      servingsPerContainer: serving,
    });
  };

  const handleDelete = async () => {
    const response = await fetch('/deleteFoods', {
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

  const handleSave = async () => {
    const response = await fetch('/addFoods', {
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
  // TODO: Delete after debugging
  /*
    const [message, setMessage] = useState('');

  console.log(message);
  // above is test information

    console.log(message)
    // above is test information
    */

  return (
    <div>
      <NavBar user={user}></NavBar>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSearch}
      >
        <TextField
          id="foodName"
          label="Search any food you like..."
          variant="outlined"
          value={foodName}
          onChange={(event) => setFoodName(event.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </form>

      {foodData && (
        <div>
          <div className="food-card">
            <h2>{foodData.name}</h2>
            <div className="food-card-row">
              <p>Calories per serving:</p>
              <p>{foodData.caloriesPerServing}</p>
            </div>
            <button onClick={handleSave}>Save food</button>
            <button onClick={handleDelete}>Delete food</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
