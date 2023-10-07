import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";
import { useQueryClient } from "@tanstack/react-query";
import errorHandler from "@/utils/errorHandler";
import { message } from "antd";
import { useSocketStore } from "../socket/socket";
import { useSearchStore } from "..//search/search";

//query to retrieve the comments for a video
export const fetchCommentData = async (id: string, pageNumber: any) => {
  // const pageNumber = useSearchStore.getState().pageNumber;

  const { data } = await axios.get(`/video/${id}/comments?page=${pageNumber || 1}&limit=10`);

  return data;
};

/**
 * @description - custom hook to retrieve all the comments for the selected video from the api
 * @param onSuccess  - callback function to be called on success
 * @param onError - callback function to be called on error
 * @returns  - returns the query object
 *
 * @author Ethan Cannelongo
 * @version 1.0
 * @since 1.0
 */
export const useComments = (options: { videoId: string; onSuccess?: (data: any) => void; onError?: (error: any) => void }) => {
  const queryClient = useQueryClient();

  const query = useInfiniteQuery(["comments", options.videoId], ({ pageParam = 1 }) => fetchCommentData(options.videoId, pageParam), {
    onSuccess: (data) => {
      // console.log(data);
      options.onSuccess && options.onSuccess(data);
    },
    onError: (error: any) => {
      options.onError && options.onError;
      errorHandler(error);
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    getNextPageParam: (lastPage) => lastPage.meta?.total / lastPage.meta?.limit > lastPage.meta?.page && lastPage.meta?.page + 1,
  });
  return query;
};

//Create a react query mutation hook to create a comment
export const createComment = async (data: any) => {
  const response = await axios.post(`/blog/${data.blogId}/comment`, data);
  return response.data;
};

export const deleteComment = async (data: any, videoId: string) => {
  const response = await axios.delete(`/video/${videoId}/comments/${data}`);
  return response.data;
};

export const useModifyComments = (blogId: any, type: "create" | "delete") => {
  const queryClient = useQueryClient();

  var requestFunc: (data: any, blogId: string) => Promise<any>;
  switch (type) {
    case "create":
      requestFunc = createComment;
      break;
    case "delete":
      requestFunc = deleteComment;
      break;
  }

  return useMutation((data) => requestFunc(data, blogId), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["blogComments"]);
      const socket = useSocketStore.getState().socket;

      if (socket) {
        socket.emit("sendNewComment", {
          commentData: data,
          blogId: blogId,
        });
      }

      message.success(data.message);
    },

    onError: (error: Error) => {
      console.log(error);
      errorHandler(error);
    },
  });
};

//Create a react query mutation hook to create a comment
