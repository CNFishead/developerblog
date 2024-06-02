import React from "react";
import styles from "./ProtectedContent.module.scss";
import formStyles from "@/styles/Form.module.scss";
import InfoContainer from "@/components/infoContainer/InfoContainer.component";
import BlogType from "@/types/BlogType";
import useGetBlogData from "@/state/blog/useGetBlogData";
import { Button, Form, Input } from "antd";
import Image from "next/image";
import { AiFillUnlock } from "react-icons/ai";
import useCheckPassword from "@/state/blog/useCheckPassword";

interface ProtectedContentProps {
  // should be passed in from the inital props from the page
  // function to set privacy field to false
  setPrivacy: (privacy: boolean) => void;
}

const ProtectedContent = ({ setPrivacy }: ProtectedContentProps) => {
  const { data } = useGetBlogData({ filter: "isPublished;true,isPrivate;false", pageLimit: 3, sort: "createdAt;-1" });
  // Define the onSuccess callback function
  const handleMutationSuccess = (data: any) => {
    // Access the data returned from the mutation here
    // if the success value is true, set the privacy to false
    if (data.success) {
      setPrivacy(false);
    }
  };

  const { mutate: postPassword } = useCheckPassword(handleMutationSuccess);
  const [form] = Form.useForm();
  const onFormFinish = async (values: any) => {
    postPassword(values);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.headerText}>
          <h1 className={`section-title`}>Protected Content</h1>
          <AiFillUnlock className={styles.icon} />
          <p>
            This section contains private and personally curated content, intended solely for my personal viewing and sharing with those I
            grant permission to. Unauthorized access to this content is a direct violation of my privacy and the trust placed in those with
            the approved password. Please respect the intended exclusivity of this blog.
          </p>
        </div>
        <Form layout="vertical" className={formStyles.form} form={form} onFinish={() => onFormFinish(form.getFieldsValue())}>
          <Form.Item
            className={formStyles.input}
            rules={[
              {
                required: true,
              },
            ]}
            name="password"
            // trim whitespace
            normalize={(value) => value?.trim()}
          >
            <Input.Password addonBefore="Password" />
          </Form.Item>

          <Button className={formStyles.button} type="primary" htmlType="submit" style={{ margin: "2% auto" }}>
            Submit
          </Button>
        </Form>
      </div>
      <div className={styles.rightContainer}>
        <InfoContainer blogs={data?.blogs} />
      </div>
    </div>
  );
};

export default ProtectedContent;
