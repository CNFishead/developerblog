import { Image, Button, Form, Input } from "antd";
import styles from "./InfoContainer.module.scss";
import formStyles from "@/styles/Form.module.scss";
import React from "react";
import socialLinks from "@/data/socialLinks";
import BlogCard from "../blogCard/BlogCard.component";
import BlogType from "@/types/BlogType";

interface InfoContainerProps {
  blogs?: BlogType[];
}

const InfoContainer = ({ blogs }: InfoContainerProps) => {
  const [showSubscribe, setShowSubscribe] = React.useState<boolean>(false);
  const [form] = Form.useForm();

  return (
    <>
      <div className={styles.socialCard}>
        <div className={styles.logoContainer}>
          <Image src="/images/logo-192x192.png" alt="logo" width={100} height={100} preview={false} />
        </div>
        <div className={styles.contentContainer}>
          <p>
            Join the journey, stay updated, and be a part of the conversation. Follow me on my social media channels to get the latest
            updates, behind-the-scenes glimpses, and more. Let's connect and share the digital adventure together!
          </p>
          <div className={styles.linksContainer}>
            {socialLinks.map((link: any) => {
              return <Button key={link.id} href={link.url} type="link" icon={link.icon} className={styles.socialButton}></Button>;
            })}
          </div>
        </div>
      </div>
      <div className={styles.newsLetterCard}>
        <h1 className={`section-title`}>Newsletter</h1>
        <span>
          If you'd like to stay up to date with the latest news, updates, and more, please subscribe to my newsletter. I promise not to
        </span>
        <div className={styles.actionContainer}>
          {showSubscribe ? (
            <Form
              form={form}
              onFinish={(values) => {
                console.log(values);
              }}
              className={formStyles.form}
            >
              <Form.Item name="email" rules={[{ required: true, message: "Please enter your email address." }]}>
                <Input placeholder="Email" className={formStyles.input} disabled />
              </Form.Item>
              <p className={formStyles.help}>By clicking subscribe you agree to receive emails from me. I promise not to spam you.</p>
              <Button htmlType="submit" className={styles.subscribeButton}>
                Subscribe
              </Button>
            </Form>
          ) : (
            <Button className={styles.subscribeButton} onClick={() => setShowSubscribe(!showSubscribe)}>
              Subscribe
            </Button>
          )}
        </div>
      </div>
      <div className={styles.blogsContainer}>
        {blogs?.map((blog) => {
          return <BlogCard blog={blog} key={blog._id} large={false} showDescription={true} />;
        })}
      </div>
    </>
  );
};

export default InfoContainer;
