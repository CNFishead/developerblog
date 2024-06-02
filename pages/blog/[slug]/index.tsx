import React from "react";
import Error from "@/components/error/Error.component";
import PageLayout from "@/layouts/PageLayout.layout";
import ProtectedContent from "@/layouts/protectedContent/ProtectedContent.layout";
import ReadBlog from "@/screens/blog/ReadBlog.screen";
import axios from "@/utils/axios";
import decryptData from "@/utils/decryptData";

interface BlogDetailsProps {
  props: any;
}

export default function BlogDetails({ props }: BlogDetailsProps) { 
  const [blog, setBlog] = React.useState<any>(JSON.parse(decryptData(props.blog)));

  return (
    <PageLayout
      meta={{
        title: `${blog?.blogTitle} | Austin Howard`,
        description: blog?.description,
        image: blog?.blogImageUrl,
        url: `https://blog.austinhoward.dev/blog/${props.slug}`,
        // for keywords, tags, is an array of string objects so we need to map over them, and return just the string joined by a comma
        keywords: blog?.tags?.map((tag: string) => tag).join(","),
      }}
      view=""
    >
      <ReadBlog />
    </PageLayout>
  );
}

BlogDetails.getInitialProps = async (ctx: any) => {
  // pull the slug
  const { slug, admin } = ctx.query;
  // fetch the blog
  try {
    const { data } = await axios.get(`/blog/${slug}/public`);
    return { props: { blog: data.data, admin } };
  } catch (error: any) {
    // console.log(error);
    return { props: { error: error.response?.data } };
  }
};
