import BlogType from "@/types/BlogType";
import React from "react";
import styles from "./ReadBlog.module.scss";
import InfoContainer from "@/components/infoContainer/InfoContainer.component";
import parser from "html-react-parser";
import useGetBlogData from "@/state/blog/useGetBlogData";

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
        <div className={styles.contentContainer}>{parser(`${parser(`${blog.content}`)}`)}</div>
      </div>
      <div className={styles.rightContainer}>
        <InfoContainer blogs={data.blogs} />
      </div>
    </div>
  );
};

export default ReadBlog;
