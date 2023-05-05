import { useEffect, useState } from 'react';
import Marquee from 'react-marquee';

function ReviewsMarquee() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/reviews')
      .then((response) => response.json())
      .then((reviews) => setReviews(reviews))
      .catch((error) => console.error(error));
  }, []);

  console.log('reviews', reviews);

  return (
    <Marquee>
      {reviews.map((review) => (
        <span key={review.id}>{review.text} </span>
      ))}
    </Marquee>
  );
}

export default ReviewsMarquee;
