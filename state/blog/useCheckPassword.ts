import axios from "@/utils/axios";
import errorHandler from "@/utils/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const postData = async (formData: any) => {
  const { data } = await axios.post(`/blog/validate`, formData);
  return data;
};

// react query mutation that posts the form data and returns the response
export default (onSuccessCallback: any) => {
  return useMutation((data: any) => postData(data), {
    onSuccess: (data: any) => {
      // Call the onSuccess callback with the data
      onSuccessCallback(data);
    },
    onError: (error: Error) => {
      errorHandler(error);
    },
  });
};
