import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../components/NavigationBar';
import { getCookie } from '../components/GetCookie';
import FoodTable from '../components/FoodTable';


function ProfilePage() {
    // initialize the user's status as not logged in
    const [user, setUser] = useState(false);

    // access the cookie to check login info
    const user_email = getCookie('user_email');

    useEffect(() => {
        if (user_email) {
          setUser(true);
        }
      }, []);

    return(
        <div style={{ textAlign: 'center' }}>
            <NavBar user={user} user_email={user_email}></NavBar>
            <h1>{user_email}'s FoodTable</h1>
            <FoodTable user={user_email}></FoodTable>
        </div>
    );
}

export default ProfilePage;