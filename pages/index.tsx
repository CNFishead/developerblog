import PageLayout from "@/layouts/PageLayout.layout";
import HomeScreen from "@/screens/home/Home.screen";
import axios from "@/utils/axios";

interface HomeProps {
  props: any;
}

export default function Home({ props }: HomeProps) {
  return (
    <PageLayout meta={{}} view="home">
      <HomeScreen blogs={props.blogs} recentBlogs={props.recentBlogs} />
    </PageLayout>
  );
}

// get intial props, get blogs
Home.getInitialProps = async () => {
  let blogs = [];
  let recentBlogs = [];
  try {
    const { data } = await axios.get(`/blog?limit=3&filterOptions=isFeatured;true,isPrivate;false`);
    blogs = data.blogs;
  } catch (error) {
    console.log(error);
  }

  try {
    const { data } = await axios.get(`/blog?limit=10&filterOptions=isPrivate;false`);
    recentBlogs = data.blogs;
  } catch (error) {}

  return {
    props: {
      blogs,
      recentBlogs,
    },
  };
};
