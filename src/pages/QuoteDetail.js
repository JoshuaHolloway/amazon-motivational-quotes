import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';

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

  const match = useRouteMatch();
  const params = useParams();

  console.log('match: ', match);

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

      {/* <Route path={`/quotes/${params.quoteId}`} exact> */}
      <Route path={match.path} exact>
        <div className='centered'>
          {/* <Link className='btn--flat' to={`/quotes/${params.quoteId}/comments`}> */}
          {/* match.url = url: "/quotes/q2" */}
          <Link className='btn--flat' to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      {/* <Route path={`/quotes/${params.quoteId}/comments`}> */}
      <Route path={`${match.path}/comments`}>
        {/* match.path = path: "/quotes/:quoteId"
        -This is a route-(handler) 
         definition and therefore a hardcoded
         route path with :quoteId is okay
        -i.e., we are only handling a router here
               with a dynamic value - not linking to the path */}
        <Comments />
      </Route>
    </>
  );
};

// ==============================================

export default QuoteDetail;
