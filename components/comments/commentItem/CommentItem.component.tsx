import styles from "./CommentItem.module.scss";
import { Button, Dropdown, Skeleton } from "antd";
import { BsFillTrashFill } from "react-icons/bs";
import Image from "next/image";
import { List, Avatar } from "antd";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useModifyComments } from "@/state/blog/comments";
import { timeDifference } from "@/utils/timeDifference";
import { useRouter } from "next/router";

type Props = {
  comment: any;
  large?: boolean;
};

const CommentItem = (props: Props) => {
  const router = useRouter();

  const { mutate: deleteComment, isLoading } = useModifyComments(router.query.videoId, "delete");
  if (isLoading) return <Skeleton active avatar loading />;
  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentDetails}>
        <p className={`${styles.commentContent} ${props.large && styles.large}`}>
          <span className={styles.commentName}>{props.comment?.name}</span>
          {props.large ? <p className={styles.commentText}>{props.comment.content}</p> : props.comment.content}

          <p className={styles.commentDate}>{timeDifference(new Date(), new Date(props.comment.createdAt))}</p>
        </p>
      </div>

      {/* <Dropdown
        menu={{
          items: [],
        }}
      >
        <AiOutlineEllipsis className={styles.icon} />
      </Dropdown> */}
    </div>
  );
};

export default CommentItem;
