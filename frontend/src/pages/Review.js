import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../components/NavigationBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { getCookie } from '../components/GetCookie';

function ReviewPage() {
  const [user, setUser] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const user_email = getCookie('user_email');

  useEffect(() => {
    if (user_email) {
      setUser(true);
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    fetch('/reviews', { signal: abortController.signal })
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.log(error));

    return () => {
      abortController.abort();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reviews: reviewText }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(reviews);
        console.log(data);
        setReviews([...reviews, data]);
        setReviewText('');
      });
  };

  useEffect(() => {
    fetch('/reviews')
      .then((response) => response.json())
      .then((reviews) => {
        console.log('inuse effect', reviews);
        setReviews(reviews.reviews);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <NavBar user={user}></NavBar>
      <h1>Reviews</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="review"
          label="Leave a review!"
          variant="outlined"
          value={reviewText}
          onChange={(event) => setReviewText(event.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      <h1>Past Reviews</h1>
      {reviews.length ? (
        <>
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>{review.content}</li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}

export default ReviewPage;
