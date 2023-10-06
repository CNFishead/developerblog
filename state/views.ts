import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/utils/axios";

export const addView = async (id: any) => {
  const { data: ipResponse } = await axios.get("https://api.bigdatacloud.net/data/client-ip", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const userAgent = navigator.userAgent;
  // You can parse the user agent string to get more specific information
  // about the user's device and browser
  const device = userAgent.match(/(iPhone|iPad|Android|Windows Phone|Tablet|Mobile|Desktop)/i);
  const browser = userAgent.match(/(Chrome|Safari|Firefox|Edge|Opera)/i);

  const { data } = await axios.put(`/blog/${id}/view`, {
    ip: ipResponse.ipString,
    device: device ?? browser,
  });

  return data;
};

export const useAddView = () => {
  const queryClient = useQueryClient();

  return useMutation((id: any) => addView(id), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["selectedVideo"]);
    },

    onError: (error: Error) => {
      console.log(error);
    },
  });
};
