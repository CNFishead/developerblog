import InfiniteScrollContainer from "@/components/infiniteScrollContainer/InfiniteScrollContainer.component";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchStore } from "@/state/search/search";
import { useMediaQuery } from "react-responsive";
import axios from "../../utils/axios";
import styles from "./SearchPage.module.scss";
import useGetBlogData from "@/state/blog/useGetBlogData";
import BlogCard from "@/components/blogCard/BlogCard.component";
import { Pagination, Skeleton } from "antd";
import Error from "@/components/error/Error.component";
import BlogType from "@/types/BlogType";
import SearchWrapper from "@/layouts/searchWrapper/SearchWrapper.layout";

type Props = {};
const SearchPage = () => {
  const router = useRouter();
  const { data, isLoading, isFetching, isError, error } = useGetBlogData();

  const { search } = router.query;
  const { setSearch, search: searchWrapperSearch } = useSearchStore();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  useEffect(() => {
    if (search) {
      setSearch(search as string);
    }
  }, [search]);

  if (isLoading) return <Skeleton active />;
  if (isError) return <Error error={error} />;
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        {searchWrapperSearch && <span className={styles.searchTitle}>Search: </span>}{" "}
        <h1 className={styles.title}>{searchWrapperSearch as string}</h1>
      </div>
      <SearchWrapper
        filters={[
          {
            key: "",
            label: "All Blogs",
          },
          {
            key: "isFeatured;true",
            label: "Featured",
          },
          {
            key: "isFeatured;false",
            label: "Not Featured",
          },
        ]}
        sort={[
          {
            key: "",
            label: "Default",
          },
          {
            key: "createdAt;-1",
            label: "Newest",
          },
          {
            key: "createdAt;1",
            label: "Oldest",
          },
          {
            key: "blogTitle;-1",
            label: "Project Name (Z-A)",
          },
          {
            key: "blogTitle;1",
            label: "Project Name (A-Z)",
          },
          {
            key: "viewsCount;-1",
            label: "Most Views",
          },
          {
            key: "viewsCount;1",
            label: "Least Views",
          },
          {
            key: "commentsCount;-1",
            label: "Most Comments",
          },
          {
            key: "commentsCount;1",
            label: "Least Comments",
          },
          {
            key: "likesCount;-1",
            label: "Most Likes",
          },
          {
            key: "likesCount;1",
            label: "Least Likes",
          },
        ]}
        placeholder="Search Blogs"
        total={data?.totalCount}
        queryKey="featuredBlogs"
        disableButtons={isFetching}
        isFetching={isFetching}
      >
        <div className={styles.contentContainer}>
          {data?.blogs?.map((blog: BlogType, index: any) => {
            return (
              <div className={styles.blogCardContainer} key={blog._id}>
                <BlogCard blog={blog} large={isTablet ? true : isMobile ? false : true} />
              </div>
            );
          })}
        </div>
      </SearchWrapper>
    </div>
  );
};

export default SearchPage;
