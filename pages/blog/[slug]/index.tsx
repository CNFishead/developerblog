import React from "react";
import Error from "@/components/error/Error.component";
import PageLayout from "@/layouts/PageLayout.layout";
import ProtectedContent from "@/layouts/protectedContent/ProtectedContent.layout";
import ReadBlog from "@/screens/blog/ReadBlog.screen";
import BlogType from "@/types/BlogType";
import axios from "@/utils/axios";

interface BlogDetailsProps {
  props: any;
}

export default function BlogDetails({ props }: BlogDetailsProps) {
  const [isProtected, setIsProtected] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!props?.blog?.isPrivate) {
      setIsProtected(false);
    }
  }, [props?.blog?.isPrivate]);

  if (props.error) {
    return (
      <>
        <PageLayout meta={{ title: "Blog | Austin Howard" }} view="Blogs">
          <Error error={props.error} />
        </PageLayout>
      </>
    );
  }

  if (isProtected && !props.admin) {
    return (
      <>
        <PageLayout meta={{ title: "Blog | Austin Howard" }} view="Blogs">
          <ProtectedContent setPrivacy={setIsProtected} />
        </PageLayout>
      </>
    );
  }

  return (
    <PageLayout
      meta={{
        title: `${props?.blog?.blogTitle} | Austin Howard`,
        description: props?.blog?.description,
        image: props?.blog?.blogImageUrl,
        url: `https://blog.austinhoward.dev/blog/${props.slug}`,
        // for keywords, tags, is an array of string objects so we need to map over them, and return just the string joined by a comma
        keywords: props?.blog?.tags?.map((tag: string) => tag).join(","),
      }}
      view=""
    >
      <ReadBlog blog={props.blog} />
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
