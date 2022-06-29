import ApiService from '../services/ApiService';
import { useEffect, useState } from 'react';
const apiService = new ApiService();
export default function Review({ movieId }) {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    apiService.fetchReviewById(movieId).then(data => {
      setResponse(data.data.results);
    });
  }, [movieId]);
  if (response) {
    if (response.length === 0) {
      return <h1>No Rewievs</h1>;
    } else {
      return (
        <ul>
          {response.map(({ author, content, id }) => {
            return (
              <li key={id}>
                <h3>Author:{author}</h3>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      );
    }
  }
}
