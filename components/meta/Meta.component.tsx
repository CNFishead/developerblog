import React from "react";
import Head from "next/head";

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
}

const Meta = ({ title, description, keywords, url, image }: MetaProps) => (
  <Head>
    {/* Favicon */}
    <link rel="icon" href="/favicon.ico" />
    {/* <!-- Primary Meta Tags --> */}
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keyword" content={keywords} />
    {/* <!-- Open Graph / Facebook --> */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />

    {/* <!-- Twitter --> */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={url} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={image} />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />

    {/* VideoJs CSS link */}
  </Head>
);

Meta.defaultProps = {
  title: "Austin Howard's Blog | Insights, Ideas, and Inspiration",
  description:
    "Welcome to Austin Howard's Blog, where you'll find a collection of insightful articles, creative ideas, and inspiring content. Explore a wide range of topics and discover something new with every visit.",
  keywords: "blog, insights, ideas, inspiration, articles, creativity, personal development, lifestyle, Austin Howard",
  url: "https://blog.austinhoward.dev",
  image: "/logo512.png",
};

export default Meta;
