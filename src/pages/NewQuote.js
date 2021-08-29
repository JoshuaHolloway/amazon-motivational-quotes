import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

// ==============================================

const NewQuote = () => {
  // --------------------------------------------

  const { sendRequest, status } = useHttp(addQuote);

  // --------------------------------------------

  const history = useHistory();

  // --------------------------------------------

  useEffect(() => {
    if (status === 'completed') {
      // TODO: Add check for error in response

      history.push('/quotes');
    }
  }, [status, history]);

  // --------------------------------------------

  const addQuoteHandler = (quoteData) => {
    console.log(quoteData);

    sendRequest(quoteData);

    // -Push to history for navigation to /quotes
    //  is now done asynchronously in the useEffect hook
    //  upon status change with status === completed state
    //  from the HTTP request/response from the useHttp hook.

    // history.push('/quotes');
  };

  // --------------------------------------------

  return (
    <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
  );

  // --------------------------------------------
};

// ==============================================

export default NewQuote;
