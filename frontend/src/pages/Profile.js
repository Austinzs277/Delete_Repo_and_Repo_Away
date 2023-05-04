import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../components/NavigationBar';
import Button from '@material-ui/core/Button';
import { getCookie } from '../components/GetCookie';


function ProfilePage() {
    // initialize the user's status as not logged in
    const [user, setUser] = useState(false);
    // access the cookie to check login info
    const user_email = getCookie('user_email');
    console.log(user_email);

    useEffect(() => {
        if (user_email) {
          setUser(true);
        }
      }, []);

    return(
        <div>
            <NavBar user={user}></NavBar>
            <h1>Profile Page</h1>
        </div>
    );
}

export default ProfilePage;