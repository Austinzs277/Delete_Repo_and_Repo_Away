import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavigationBar';

function HomePage() {

    // this is test information
    const [message, setMessage] = useState('');

    useEffect(() => {
      fetch('http://localhost:8080/api/test')
        .then((response) => response.json())
        .then((data) => setMessage(data.message))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);

    console.log(message)
    // above is test information

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