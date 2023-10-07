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

  // if its mobile device, set deviceType to mobile, if its a tablet, set it to tablet
  // if its desktop, set it to desktop
  const deviceType = device ? (device[0].toLowerCase() === "mobile" ? "mobile" : "tablet") : "desktop";
  const { data } = await axios.put(`/blog/${id}/view`, {
    ip: ipResponse.ipString,
    device: deviceType,
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
