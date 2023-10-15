import { Button, Form, Input, Skeleton, Empty, message } from "antd";
import Image from "next/image";
import styles from "./InfoContainer.module.scss";
import formStyles from "@/styles/Form.module.scss";
import React from "react";
import socialLinks from "@/data/socialLinks";
import BlogCard from "../blogCard/BlogCard.component";
import BlogType from "@/types/BlogType";
import Error from "../error/Error.component";
import usePostDataMutation from "@/state/usePostDataMutation";

interface InfoContainerProps {
  blogs?: BlogType[];
  loading?: boolean;
  isError?: boolean;
  error?: any;
}

const InfoContainer = ({ blogs, loading, isError, error }: InfoContainerProps) => {
  const [showSubscribe, setShowSubscribe] = React.useState<boolean>(false);
  const [form] = Form.useForm();

  const onSuccessCallback = (data: any) => {
    if (data.success) {
      setShowSubscribe(false);
      message.success("You have successfully subscribed to my newsletter.");
    }
  };
  const { mutate: newsLetterSignup } = usePostDataMutation({ url: "/util/newsletter", onSuccessCallback });

  const onFormFinish = async (values: any) => {
    newsLetterSignup(values);
  };
  return (
    <>
      <div className={styles.socialCard}>
        <div className={styles.logoContainer}>
          <Image src="/images/logo-192x192.png" alt="logo" width={100} height={100} />
        </div>
        <div className={styles.contentContainer}>
          <p>
            Join the journey, stay updated, and be a part of the conversation. Follow me on my social media channels to get the latest
            updates, behind-the-scenes glimpses, and more. Let&apos;s connect and share the digital adventure together!
          </p>
          <div className={styles.linksContainer}>
            {socialLinks.map((link: any) => {
              return (
                <Button
                  key={link.id}
                  href={link.url}
                  type="link"
                  icon={link.icon}
                  className={styles.socialButton}
                  aria-label={`Social Link ${link.name}`}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.newsLetterCard}>
        <h1 className={`section-title`}>Newsletter</h1>
        <span>
          If you&apos;d like to stay up to date with the latest news, updates, and more, please subscribe to my newsletter. I promise not to
        </span>
        <div className={styles.actionContainer}>
          {showSubscribe ? (
            <Form form={form} onFinish={() => onFormFinish(form.getFieldsValue())} className={formStyles.form}>
              <Form.Item name="email" rules={[{ required: true, message: "Please enter your email address." }]}>
                <Input placeholder="Email" className={formStyles.input} />
              </Form.Item>
              <p className={formStyles.help}>By clicking subscribe you agree to receive emails from me. I promise not to spam you.</p>
              <Button htmlType="submit" className={styles.subscribeButton} aria-label="subscribe to newsletter button">
                Subscribe
              </Button>
            </Form>
          ) : (
            <Button
              className={styles.subscribeButton}
              onClick={() => setShowSubscribe(!showSubscribe)}
              aria-label="subscribe to newsletter button"
            >
              Subscribe
            </Button>
          )}
        </div>
      </div>
      <div className={styles.blogsContainer}>
        {loading ? (
          <Skeleton active />
        ) : isError ? (
          <Error error={error} />
        ) : blogs?.length === 0 ? (
          <Empty description="No blogs found." />
        ) : (
          blogs?.map((blog) => {
            return <BlogCard blog={blog} key={blog._id} large={false} showDescription={true} />;
          })
        )}
      </div>
    </>
  );
};

export default InfoContainer;
