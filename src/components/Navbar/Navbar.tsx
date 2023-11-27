import { Link } from "react-router-dom";
import { Logo } from "@/components/Icon";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-5">
      <Link className={styles["nav-link"]} to="">
        Đơn vị tổ chức
      </Link>
      <Link className={styles["nav-link"]} to="">
        Vé vào cửa
      </Link>
      <Link to="">
        <Logo />
      </Link>
      <Link className={styles["nav-link"]} to="">
        Cửa hàng
      </Link>
      <Link className={styles["nav-link"]} to="">
        Liên hệ
      </Link>
    </div>
  );
};

export default Navbar;
