import React from "react";
import styles from "./Header.module.scss";
import { navigation } from "@/data/navigation";
import { Image } from "antd";
import { useRouter } from "next/router";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { BiSearchAlt } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import Link from "next/link";
import { Button, Form, Input } from "antd";
import homelinks from "@/data/homelinks";

interface HeaderProps {
  view?: string;
  showSearchBar?: boolean;
}

const Header = (props: HeaderProps) => {
  const navigate = useRouter();
  // const [showMenu, setShowMenu] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);

  const onSearch = (values: any) => {
    // trim and url encode the search query
    const search = values.search.trim();
    const urlEncodedSearch = encodeURIComponent(search);
    if (values.search.trim()) {
      navigate.push(`/search?search=${urlEncodedSearch}`);
    } else {
      navigate.push("/");
    }
  };
  return (
    <div className={styles.container}>
      <div className={showSearch ? styles.navbarContainer + " " + styles.searchShowing : styles.navbarContainer}>
        <div
          className={showSearch ? styles.searchShowing + " " + styles.searchBackBtn : styles.searchBackBtn}
          onClick={() => setShowSearch(false)}
        >
          <IoIosArrowBack />
        </div>
        <Link href="/">
          <div className={showSearch ? styles.logoContainer + " " + styles.searchShowing : styles.logoContainer}>
            <Image src="/images/logo-192x192.png" alt="logo" width={100} height={100} preview={false} />
            <span className={styles.logoText}>The Digital Adventure</span>
          </div>
        </Link>

        {props.showSearchBar && (
          <div className={showSearch ? styles.searchContainer + " " + styles.showing : styles.searchContainer}>
            <Form onFinish={onSearch} rootClassName={styles.searchForm}>
              <Form.Item name="search" className={styles.searchInputItem}>
                <Input placeholder="Search Blogs" className={styles.searchInput} />
              </Form.Item>
              <Form.Item className={styles.searchBtnItem}>
                <Button htmlType="submit" className={styles.searchBtn} aria-label="search blogs button">
                  <BiSearchAlt />
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}

        <div className={showSearch ? styles.linksContainer + " " + styles.searchShowing : styles.linksContainer}>
          {homelinks.map((link) => {
            return (
              <Link href={link.url} key={link.title}>
                <span className={`${styles.navItem} ${props.view === link.title ? styles.active : ""}`}>{link.title}</span>
              </Link>
            );
          })}
          <Button
            className={showSearch ? styles.showSearchBtn + " " + styles.showing : styles.showSearchBtn}
            onClick={() => setShowSearch(true)}
          >
            <BiSearchAlt />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
