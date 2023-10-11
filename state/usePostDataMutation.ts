import axios from "@/utils/axios";
import errorHandler from "@/utils/errorHandler";
import { useMutation } from "@tanstack/react-query";

const postData = async (url: string, formData: any) => {
  const { data } = await axios.post(url, formData);
  return data;
};

// react query mutation that posts the form data and returns the response
export default (options: { onSuccessCallback?: any; url: string }) => {
  return useMutation((data: any) => postData(options.url, data), {
    onSuccess: (data: any) => {
      // Call the onSuccess callback with the data
      options.onSuccessCallback?.(data);
    },
    onError: (error: Error) => {
      errorHandler(error);
    },
  });
};
