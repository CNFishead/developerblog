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
import useFetchData from "@/state/useFetchData";
import VideoPlayer from "@/components/videoPlayer/VideoPlayer.component";
import { useParams } from "next/navigation";
import Loader from "@/components/loader/Loader.component";
import Error from "@/components/error/Error.component";
import decryptData from "@/utils/decryptData";
import ProtectedContent from "@/layouts/protectedContent/ProtectedContent.layout";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const ReadBlog = () => {
  // pull the slug out of params
  const { slug } = useParams();
  // pull the admin out of the query params
  const searchParams = useSearchParams();
  const admin = searchParams.get("admin");
  const queryClient = useQueryClient();
  const [blog, setBlog] = React.useState<any>({});
  const [protectedContent, setProtectedContent] = React.useState(true);
  const [showComments, setShowComments] = React.useState(false);
  const {
    data: blogEncrypted,
    isLoading: blogLoading,
    isError: blogIsError,
    error: blogError,
    isFetching: blogIsFetching,
  } = useFetchData({
    url: `/blog/${slug}/public`,
    key: [`readingBlog`, `${slug}`],
    // disable this if there is no blog data
    enabled: !!slug,
  });
  const { data, isLoading, isError, error } = useFetchData({
    url: "/blog",
    key: "blogScreenBlogs",
    // disable this if there is no blog data
    enabled: !!blog,
    filter: "isPublished;true,isPrivate;false",
    pageLimit: 5,
    sort: "createdAt;-1",
  });

  const { mutate: updateBlogViewCount } = useAddView();
  const {
    data: commentData,
    isLoading: commentsLoading,
    isError: commentsError,
    error: commentErrorData,
  } = useGetComments({ postId: blog?._id, filter: "isFlagged;false" });

  // when the component mounts update the view count
  React.useEffect(() => {
    if (blog?._id) {
      updateBlogViewCount(blog?._id);
    }
  }, []);
  // invalidate the query when the slug is updated
  // React.useEffect(() => {
  //     queryClient.invalidateQueries(["readingBlog"]);
  // }, [slug]);

  React.useEffect(() => {
    // set the protected content to false if the blog is not private
    if (blog?.isPrivate === false || admin === "true") {
      setProtectedContent(false);
    }
  }, [blog]);

  React.useEffect(() => {
    if (blogEncrypted?.data) {
      setBlog(JSON.parse(decryptData(blogEncrypted?.data)));
    }
  }, [blogEncrypted]);
  if (blogLoading || blogIsFetching) {
    return <Loader />;
  }
  if (blogIsError) {
    return <Error error={blogError} />;
  }
  if (protectedContent) {
    return <ProtectedContent setPrivacy={setProtectedContent} />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <h1 className={`section-title`}>{blog?.blogTitle}</h1>
        <div className={styles.coverImageContainer}>
          {blog?.blogImageUrl && blog?.blogImageUrl !== "/images/no-photo.jpg" && (
            <Image src={blog?.blogImageUrl} alt={blog.blogTitle} preview={false} />
          )}
        </div>
        {blog?.isVlog && (
          <div className={styles.videoContainer}>
            <VideoPlayer video={blog} />
          </div>
        )}
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

        <div className={styles.contentContainer}>
          <div>{parser(`${parser(`${blog?.content ?? ""}`)}`)}</div>
        </div>
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
