import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';

import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './Comments.module.css';

// ==============================================

const Comments = () => {
  //---------------------------------------------

  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { quoteId } = params;

  //---------------------------------------------

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  //---------------------------------------------

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  //---------------------------------------------

  let comments;

  if (status === 'pending') {
    comments = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'completed' && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === 'completed' &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className='centered'>No comments were added yet!</p>;
  }

  //---------------------------------------------

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  //---------------------------------------------

  // -addedCommentHandler is passed to the NewCommentForm
  //  component through the onAddedComment prop.
  // -In NewCommentForm.js we use onAddedComment
  //  as a dependency for an effect.
  // -If we don't use the useCallback() hook here
  //  then this callback function will be re-created
  //  every time this component is re-rendered,
  //  which will trigger a run of useEffect
  //  in NewComponentForm which cuases an infinite-loop.
  const addedCommentHandler = useCallback(
    () => {
      sendRequest(quoteId);
    },
    [sendRequest, quoteId]
    // -Re-create the function passed into useCallback()
    //  only if the values in the dependency list change.
  );
  // -useCallback essentially ensures that the function
  //  passed in is not re-created each time the
  //  component is re-evaluated, which therefore
  //  protects against unnessesary re-render cycles
  //  and avoids potential infinite-loops.

  //---------------------------------------------

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {/* onAddedComment prop points at a function that is executed when a comment is added */}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );

  //---------------------------------------------
};

// ==============================================

export default Comments;
