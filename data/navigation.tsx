import { RiHome2Fill } from "react-icons/ri";

export const navigation = (options?: { loggedInData?: { user: any } }) => {
  return {
    home: {
      title: "Home",
      links: {
        home: {
          title: "Home",
          link: "/",
          icon: <RiHome2Fill />,
        },
        blogs: {
          title: "Blogs",
          link: "/blog",
          icon: <RiHome2Fill />,
        },
      },
    },
  };
};
