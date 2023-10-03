import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { TbWorldShare } from "react-icons/tb";
import styles from "@/styles/socialLinks.module.scss";

/**
 * @description social links data
 */
export default [
  {
    id: 1,
    icon: <FaGithub className={styles.icon} />,
    url: "https://github.com/CNFishead",
  },
  {
    id: 2,
    icon: <FaLinkedin className={styles.icon} />,
    url: "https://www.linkedin.com/in/cnfishead1993/",
  },
];
