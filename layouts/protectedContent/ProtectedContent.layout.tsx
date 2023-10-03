import React from "react";
import styles from "./ProtectedContent.module.scss";
import InfoContainer from "@/components/infoContainer/InfoContainer.component";
import BlogType from "@/types/BlogType";
import useGetBlogData from "@/state/blog/useGetBlogData";

const ProtectedContent = () => {
  const { data, isLoading, isError, error } = useGetBlogData({ filter: "isPrivate;false", pageLimit: 3, sort: "createdAt;-1" });
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}></div>
      <div className={styles.rightContainer}>
        <InfoContainer blogs={data.blogs} />
      </div>
    </div>
  );
};

export default ProtectedContent;
