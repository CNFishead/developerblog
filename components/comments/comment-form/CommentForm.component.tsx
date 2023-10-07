import { Button, Form, Input, Modal } from "antd";
import { Avatar } from "antd";
import { useForm } from "antd/lib/form/Form";
import formStyles from "@/styles/Form.module.scss";
import Loader from "@/components/loader/Loader.component";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
// import { useModifyComments } from 'state/videos/comments';

import styles from "./CommentForm.module.scss";
import { useModifyComments } from "@/state/blog/comments";
import useGetBlogData from "@/state/blog/useGetBlogData";
import BlogType from "@/types/BlogType";

/**
 * @function CommentForm - CommentForm component
 * @desc                Shows a form to create a new post/comment/reply
 * @param {object} props - props passed from parent component
 * @param {function} props.submitHandler - function to handle submit event passed in from the parent of where the form is hosted.
 *
 * @returns {JSX} - JSX representation of component
 */
type Props = {
  scroll?: () => void;
  small?: boolean;
  blog?: BlogType;
};
const CommentForm = (props: Props) => {
  const router = useRouter();

  const { mutate: addComment, isLoading: addCommentIsLoading } = useModifyComments(router.query.videoId, "create");

  const [form] = useForm();

  const [comment, setComment] = useState("");
  const onAddComment = (values: any) => {
    Modal.confirm({
      title: "Are you sure you want to comment?",
      content: `This will post your comment to the blog, all comments
      are moderated and will be reviewed before being posted. So if your comment
      doesn't show up right away, don't worry!`,
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        addComment({ ...values, blogId: props?.blog?._id });
        props.scroll && props.scroll();
        form.resetFields();
      },
    });
  };
  return (
    <div className={styles.postFormContainer}>
      <div className={styles.textareaContainer}>
        {/* <div className={formStyles.editContainer}> */}
        <Form onFinish={onAddComment} layout="vertical" form={form} className={formStyles.form}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder={"Name"} className={formStyles.input} />
          </Form.Item>
          <Form.Item name="content" label={comment.length + " / 280"}>
            <Input.TextArea
              placeholder={"Share your thoughts!"}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              maxLength={280}
              className={formStyles.input}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  onAddComment({ comment: e.currentTarget.value });
                }
              }}
            />
          </Form.Item>
          <div className={styles.button}>
            <Form.Item>
              {addCommentIsLoading ? (
                <Loader />
              ) : (
                <Button disabled={comment?.length === 0} htmlType="submit" className="postButton" type="primary">
                  Comment
                </Button>
              )}
            </Form.Item>
          </div>
        </Form>
      </div>
      {/* </div> */}
    </div>
  );
};

export default CommentForm;
