import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavigationBar';

function HomePage() {
    const location = useLocation();
    // check if the user is logged in
    const [user, setUser] = useState(false);
    console.log(location);

    useEffect(() => {
        if (location.state) {
          setUser(true);
        }
      }, [location]);

    return (
        <div>
        <NavBar user={user}></NavBar>
        </div>
    );
}

export default HomePage;