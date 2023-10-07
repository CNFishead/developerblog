import BlogType from "@/types/BlogType";
import React from "react";
import styles from "./ReadBlog.module.scss";
import InfoContainer from "@/components/infoContainer/InfoContainer.component";
import parser from "html-react-parser";
import useGetBlogData from "@/state/blog/useGetBlogData";
import { FaCalendarAlt, FaComment, FaCommentAlt, FaEye, FaTags, FaTimes, FaUser } from "react-icons/fa";
import { Button, Image } from "antd";
import { useAddView } from "@/state/views";
import CommentForm from "@/components/comments/comment-form/CommentForm.component";
import useGetComments from "@/state/blog/useGetComments";
import CommentItem from "@/components/comments/commentItem/CommentItem.component";

interface ReadBlogProps {
  // should be passed in from the inital props from the page
  blog: BlogType;
}
const ReadBlog = ({ blog }: ReadBlogProps) => {
  const [showComments, setShowComments] = React.useState(false);
  const { data, isLoading, isError, error } = useGetBlogData({ filter: "isPrivate;false", pageLimit: 3, sort: "createdAt;-1" });

  const { mutate: updateBlogViewCount } = useAddView();
  const {
    data: commentData,
    isLoading: commentsLoading,
    isError: commentsError,
    error: commentErrorData,
  } = useGetComments({ postId: blog?._id, filter: "isFlagged;false" });

  // when the component mounts update the view count
  React.useEffect(() => {
    updateBlogViewCount(blog?._id);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <h1 className={`section-title`}>{blog?.blogTitle}</h1>
        <div className={styles.coverImageContainer}>
          <Image src={blog?.blogImageUrl} alt={blog.blogTitle} preview={false} />
        </div>
        <div className={styles.metaContainer}>
          <span className={styles.metaItem}>
            <FaUser />
            <span className={styles.metaItemText}>{blog?.author}</span>
          </span>
          <span className={styles.metaItem}>
            <FaCalendarAlt />
            <span className={styles.metaItemText}>{new Date(blog?.createdAt).toLocaleDateString()}</span>
          </span>
          <span className={styles.metaItem}>
            <FaEye />
            <span className={styles.metaItemText}>{blog?.viewsCount}</span>
          </span>
          <span className={styles.metaItem}>
            <FaComment />
            <span className={styles.metaItemText}>{blog?.commentsCount}</span>
          </span>
        </div>
        {blog?.description && (
          <div className={styles.metaContainer}>
            <span className={`${styles.metaItem} ${styles.descriptionContainer}`}>
              <span className={styles.metaItemText}>{blog?.description}</span>
            </span>
          </div>
        )}

        <div className={styles.contentContainer}>{parser(`${parser(`${blog?.content}`)}`)}</div>
        <div className={`${styles.metaContainer} ${styles.metaFooterContainer}`}>
          <span className={styles.metaItem}>
            <span className={styles.metaItemText}>
              {blog?.tags?.map((tag, index) => (
                <span key={tag + index} className={styles.tagItem}>
                  {tag}
                </span>
              ))}
            </span>
          </span>
        </div>
      </div>
      <div className={styles.rightContainer}>
        {showComments ? (
          <div className={styles.commentContainer}>
            <div className={styles.titleContainer}>
              <h2 className={`section-title`}>Comments</h2>
              <FaTimes className={styles.closeButton} onClick={() => setShowComments(!showComments)} />
            </div>
            <CommentForm blog={blog} />
            {commentData?.comments?.map((comment: any) => (
              <CommentItem comment={comment} key={comment._id} />
            ))}
          </div>
        ) : (
          <InfoContainer blogs={data?.blogs} loading={isLoading} isError={isError} error={error} />
        )}
      </div>
      {/* show comments button is a floating button on the right side of the screen */}
      {!showComments && (
        <div
          id="commentsContainer"
          className={styles.showCommentsButtonContainer}
          onClick={() => {
            setShowComments(true);
            // scroll into view
            document.getElementById("commentsContainer")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <Button className={styles.showCommentsButton}>
            <FaCommentAlt />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReadBlog;
