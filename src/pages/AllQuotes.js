import QuoteList from '../components/quotes/QuoteList';

// ==============================================

const DUMMY_QUOTES = [
  { id: 'q1', author: 'Josh', text: 'this is the flipping text!' },
  { id: 'q2', author: 'Joshua', text: 'this is even more flipping text!' },
];

// ==============================================

const AllQuotes = () => {
  return <QuoteList quotes={DUMMY_QUOTES} />;
};

// ==============================================

export default AllQuotes;
