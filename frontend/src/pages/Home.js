import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../components/NavigationBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { getCookie } from '../components/GetCookie';

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
    // access the cookie to check login info
    const user_email = getCookie('user_email');

    useEffect(() => {
        if (user_email) {
            setUser(true);
        }
      }, []);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        /** TODO: implement the GET API to search for food */
    }

    // TODO: Delete after debugging
    /*
    const [message, setMessage] = useState('');

    useEffect(() => {
      fetch('http://localhost:8080/api/test')
        .then((response) => response.json())
        .then((data) => setMessage(data.message))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);

    console.log(message)
    // above is test information
    */

    return (
        <div>
            <NavBar user={user}></NavBar>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleOnSubmit}>
                <TextField id="outlined-basic" label="Search any food you like..." variant="outlined" />
                <Button variant="contained" color="primary" type="submit">
                    Search
                </Button>
            </form>
        </div>
    );
}

export default HomePage;