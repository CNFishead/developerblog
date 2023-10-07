import { useQueryClient } from '@tanstack/react-query';
import InfiniteScrollContainer from 'components/infiniteScrollContainer/InfiniteScrollContainer.component';
import React, { useEffect, useState } from 'react';
import { useSearchStore } from 'state/search/search';
import { useComments } from 'state/videos/comments';

import CommentForm from '../comment-form/CommentForm.component';
import CommentItem from '../commentItem/CommentItem.component';
import styles from './CommentContainer.module.scss';
import { useRouter } from 'next/router';

type Props = {};
const CommentContainer = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: commentsData, isLoading } = useComments({
    videoId: router.query.videoId as string,
  });

  useEffect(() => {
    queryClient.invalidateQueries(['comments']);
  }, []);

  return (
    <div className={styles.commentsContainer}>
      <div className={styles.commentForm}>
        <CommentForm />
      </div>
      <p className={styles.meta}>
        {commentsData?.pages[0]?.meta?.total || 0} comments
      </p>

      <InfiniteScrollContainer
        render={(comment: any, index: number) => (
          <CommentItem comment={comment} large />
        )}
        hookParams={{
          videoId: router.query.videoId as string,
        }}
        hook={useComments}
        dataKey="comments"
      />
    </div>
  );
};

export default CommentContainer;
