import InfiniteScrollContainer from "@/components/infiniteScrollContainer/InfiniteScrollContainer.component";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchStore } from "@/state/search/search";
// import CommentForm from './views/comment-form/CommentForm.Form';

import { useComments } from "@/state/blog/comments";

import CommentForm from "../comment-form/CommentForm.component";
import CommentItem from "../commentItem/CommentItem.component";
import styles from "./LiveCommentContainer.module.scss";
import { useRouter } from "next/router";

const LiveCommentContainer = () => {
  const router = useRouter();
  const { data: commentsData, isLoading } = useComments({
    videoId: router.query.videoId as string,
  });

  const scrollToTop = () => {
    var element = document.getElementById("comments");
    if (element) element.scrollTop = element.scrollHeight;
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <div className={styles.commentsWrapper}>
        <div className={styles.titleContainer}>
          <h5 className={styles.commentsTitle}>Live Comments</h5>
          <p className={styles.meta}>{commentsData?.pages[0]?.meta?.total || 0} comments</p>
        </div>
        <div className={styles.commentsContainer} id="comments">
          <InfiniteScrollContainer
            render={(comment: any, index: number) => <CommentItem comment={comment} />}
            hookParams={{
              videoId: router.query.videoId as string,
            }}
            hook={useComments}
            dataKey="comments"
          />
        </div>
        <div className={styles.formContainer}>
          <div className={styles.form}>
            <CommentForm small scroll={scrollToTop} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveCommentContainer;
