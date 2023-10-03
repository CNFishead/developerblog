import React from "react";
import styles from "./PageLayout.module.scss";
import Footer from "./footer/Footer.laytout";
import Header from "./header/Header.layout";
import Meta from "@/components/meta/Meta.component";

interface PageLayoutProps {
  children: React.ReactNode;
  meta?: any;
  view?: string;
}

const PageLayout = (props: PageLayoutProps) => {
  return (
    <>
      <Meta title={props.meta.title} description={props.meta.description} keywords={props.meta.keywords} image={props.meta.image} />
      <div className={styles.container}>
        <Header view={props.view} showSearchBar={props.view === "search" ? false : true} />
        <div className={styles.content}>{props.children}</div>
        <div className={styles.footerContainer}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PageLayout;
