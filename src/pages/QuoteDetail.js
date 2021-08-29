import { useParams, Route } from 'react-router-dom';

// ==============================================

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';

// ==============================================

const DUMMY_QUOTES = [
  { id: 'q1', author: 'Josh', text: 'this is the flipping text!' },
  { id: 'q2', author: 'Joshua', text: 'this is even more flipping text!' },
];

// ==============================================

const QuoteDetail = () => {
  // --------------------------------------------

  const params = useParams();

  // --------------------------------------------

  const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  if (!quote) {
    return <p>No quote found!</p>;
  }

  // --------------------------------------------

  return (
    <>
      {/* <p>{params.quoteId}</p> */}
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={`/quotes/${params.quoteId}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

// ==============================================

export default QuoteDetail;
