import React from "react";
import styles from "./Footer.module.scss";
import { Row, Col } from "antd";
import socialLinks from "@/data/socialLinks";

const Footer = () => {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let year = dateObj.getUTCFullYear();

  let newdate = month + "/" + year;
  return (
    <div className={styles.container}>
      <div className={styles.linksContainer}>
        {socialLinks.map((social, indx) => {
          return (
            <div key={indx + social.id} className="social-link">
              <a href={social.url}>{social.icon}</a>
            </div>
          );
        })}
      </div>
      <Row  style={{ textAlign: "center" }}>
        <Col style={{ color: "#f3ec78" }}>
          <p>Connect with me!</p>
          <p>Wulf Developments {newdate}</p>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
