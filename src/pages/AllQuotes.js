import { useEffect } from 'react';

import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';

import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

// ==============================================

// const DUMMY_QUOTES = [
//   { id: 'q1', author: 'Josh', text: 'this is the flipping text!' },
//   { id: 'q2', author: 'Joshua', text: 'this is even more flipping text!' },
// ];

// ==============================================

const AllQuotes = () => {
  // --------------------------------------------

  const startWithPending = true;
  const {
    sendRequest,
    status,
    data: loadedQuotes, // alias (data -> loadedQuotes)
    error,
  } = useHttp(getAllQuotes, startWithPending);

  // --------------------------------------------

  // Send request when the component loads:
  //  -dependency list: []
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  // --------------------------------------------

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  // --------------------------------------------

  if (error) {
    return <p className='centered focused'>{error}</p>;
  }

  // --------------------------------------------

  // -no error but also no quotes:
  if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  // --------------------------------------------

  // return <QuoteList quotes={DUMMY_QUOTES} />;
  return <QuoteList quotes={loadedQuotes} />;
};

// ==============================================

export default AllQuotes;
