import BlogType from "@/types/BlogType";
import React from "react";
import styles from "./ReadBlog.module.scss";
import InfoContainer from "@/components/infoContainer/InfoContainer.component";
import parser from "html-react-parser";
import useGetBlogData from "@/state/blog/useGetBlogData";
import { FaCalendarAlt, FaTags, FaUser } from "react-icons/fa";
import { Image } from "antd";

interface ReadBlogProps {
  // should be passed in from the inital props from the page
  blog: BlogType;
}
const ReadBlog = ({ blog }: ReadBlogProps) => {
  console.log(blog);
  const { data, isLoading, isError, error } = useGetBlogData({ filter: "isPrivate;false", pageLimit: 3, sort: "createdAt;-1" });
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <h1 className={`section-title`}>{blog?.blogTitle}</h1>
        <div className={styles.coverImageContainer}>
          <Image src={blog.blogImageUrl} alt={blog.blogTitle} preview={false} />
        </div>
        <div className={styles.metaContainer}>
          <span className={styles.metaItem}>
            <FaUser />
            <span className={styles.metaItemText}>{blog.author}</span>
          </span>
          <span className={styles.metaItem}>
            <FaCalendarAlt />
            <span className={styles.metaItemText}>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </span>
        </div>
        <div className={styles.metaContainer}>
          <span className={`${styles.metaItem} ${styles.descriptionContainer}`}>
            <span className={styles.metaItemText}>{blog.description}</span>
          </span>
        </div>

        <div className={styles.contentContainer}>{parser(`${parser(`${blog.content}`)}`)}</div>
        <div className={`${styles.metaContainer} ${styles.metaFooterContainer}`}>
          <span className={styles.metaItem}>
            <span className={styles.metaItemText}>
              {blog.tags.map((tag, index) => (
                <span key={tag + index} className={styles.tagItem}>
                  {tag}
                </span>
              ))}
            </span>
          </span>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <InfoContainer blogs={data?.blogs} loading={isLoading} isError={isError} error={error} />
      </div>
    </div>
  );
};

export default ReadBlog;
