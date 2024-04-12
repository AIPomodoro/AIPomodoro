import { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import PipeyResponse from 'src/components/PipeyResponse'

export const QUERY = gql`
  query GetJournalResponse($userId: Int!) {
    getJournalResponse(userId: $userId) {
      id
      response
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No response yet.</div>

export const Failure = ({ error }) => <div style={{ color: 'red' }}>Error: {error.message}</div>

export const Success = ({ getJournalResponse, onClose }) => {
  // When the query is successful, set show to true
  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false); // This will start the hide animation
      setTimeout(onClose, 10000); // Give some time for the hide animation
    }, 20000);
    return () => clearTimeout(timer);
  }, [getJournalResponse, onClose]);

  const [show, setShow] = useState(false);

  return (
    <div>
      <PipeyResponse response={getJournalResponse.response} onClose={onClose} showAIResponse={show} />
    </div>
  );
};
