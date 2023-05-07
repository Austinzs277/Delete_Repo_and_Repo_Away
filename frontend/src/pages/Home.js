import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import NavBar from '../components/NavigationBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { getCookie } from '../components/GetCookie';
import 'firebase/compat/auth';

/** Style */
const useStyles = makeStyles((theme) => 
    createStyles({
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
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 500,
          },
          image: {
            width: 128,
            height: 128,
          },
          img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
          },
    })
);

function HomePage() {
    const classes = useStyles();
  /*
    // get user's log in status
    const location = useLocation();
    console.log(location);
    */

    // initialize the user's status as not logged in
    const [user, setUser] = useState(false);
    // access the cookie to check login info
    const user_email = getCookie('user_email');
    useEffect(() => {
        if (user_email) {
            setUser(true);
        }
    }, []);

    /** TODO: Clean there variables */
    const [foodName, setFoodName] = useState('');
    const [foodData, setFoodData] = useState(null);
    const [savedFoods, setSavedFoods] = useState(null);

    // Handle the search button
    const handleSearch = async (event) => {
        event.preventDefault();
        /** TODO: There is a delay between click and api call*/ 
        console.log(foodName);
        const foodInput = {
        "foodName": foodName
        }
        fetch("/searchFood", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(foodInput),
            })
            .then(response =>{
                if (response.ok) {
                return response.json();
                } else{
                /** TODO: Implement the 404 and catch the error  */
                throw new Error("Reponse is not OK");
                }
        })
        .then(data => {
            console.log(data);
            const foodTitle = data.name;
            const foodUrl = data.image;
            const foodCal = data.calories;
            setFoodData({
                name: foodTitle,
                caloriesPerServing: foodCal,
                url: foodUrl
            });
        })
        .catch(error => {
            console.log(error)
        });
    };

    // handle the save food button
    const handleSaveFood = () => {
        const saveFood = {
            "foodName": foodData.name,
            "username": user_email,
            "calories": foodData.caloriesPerServing
        }
        fetch("/addFood", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(saveFood),
            })
            .then(response =>{
                if (response.ok) {
                console.log(response);
                return response.json();
                } else{
                /** TODO: Implement the 404 and catch the error  */
                throw new Error("Reponse is not OK");
                }
        })
        .then(data => {
           console.log(data);
        })
        .catch(error => {
            console.log(error)
        });
    }

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
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                        <img className={classes.img} alt="complex" src={foodData.url} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                            {foodData.name}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                            Calories per serving:
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                            {foodData.caloriesPerServing}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary" onClick={() => handleSaveFood()}>
                            Save Food
                            </Button>
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )}
    </div>
  );
}

export default HomePage;
