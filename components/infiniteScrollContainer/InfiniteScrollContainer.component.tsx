import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "antd";
import Error from "@/components/error/Error.component";
import Loader from "@/components/loader/Loader.component";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInView } from "react-intersection-observer";
import { useSearchStore } from "@/state/search/search";

/**
 * A container component that provides infinite scrolling functionality.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.hook - The hook function that provides the data and pagination functionality.
 * @param {string} props.dataKey - The key used to access the data in the hook's query result.
 * @param {string} [props.dataKey2] - An optional second key used to access additional data in the hook's query result.
 * @param {boolean} [props.needsDataParam] - Whether the data brought back from the hook function requires a data parameter.
 * @param {Object} [props.hookParams] - Additional parameters to pass to the hook function.
 * @param {Function} props.render - The function that renders each item in the data array.
 * @param {Function} [props.render2] - An optional function that renders each item in the additional data array.
 */

type Props = {
  hook: any;
  dataKey: string;
  dataKey2?: string;
  needsDataParam?: boolean;
  hookParams?: any;
  render: (data: any, index: any) => React.ReactNode;
};

const InfiniteScrollContainer = (props: Props) => {
  const { data, isLoading, isSuccess, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = props.hook(
    props.hookParams
  );
  const { ref, inView } = useInView();
  const { setPageNumber, pageNumber } = useSearchStore((state) => state);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isLoading && isSuccess) {
      setPageNumber(pageNumber + 1);
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    setPageNumber(1);

    return () => {
      setPageNumber(1);
    };
  }, []);

  const getPage = (page: any, dataKey: any) => {
    return props.dataKey !== "" ? (props.needsDataParam ? page[dataKey][props.needsDataParam ? "data" : ""] : page[dataKey]) : page;
  };

  if (isLoading || data.pages.length === 0) return <Skeleton active />;
  if (isError) return <Error error={error} />;

  console.log(data);
  const content =
    isSuccess &&
    data?.pages?.map((page: any) =>
      getPage(page, props.dataKey).map((d: any, i: any) => {
        if (getPage(page, props.dataKey).length === i + 1) {
          return (
            <div ref={ref} key={i}>
              {props.render(d, i)}
            </div>
          );
        }
        return <div key={i}>{props.render(d, i)}</div>;
      })
    );

  return (
    <>
      {content}
      {/* {props.dataKey2} */}
      {isFetchingNextPage && <Loader />}
    </>
  );
};

export default InfiniteScrollContainer;
