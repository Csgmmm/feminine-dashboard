import { Link, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";
import Homepage from "../homepage/Homepage";
import Logo from "../logo/Logo";
import Button from "../button/Button";

function Sidebar() {
  const location= useLocation();
  return (
    <>
      <aside className={styles.sidebar}>
        <Link to={"/homepage"}>
        <div className={styles.logoContainer}>
          <Logo/>
          <span className={styles.logoText}>MyCycle</span>
        </div>
        </Link>

        <nav className="nav">
          <Link to={"/homepage"}>
            <Button variant="primary" isActive={location.pathname === "/homepage" ? true : false}>
              <Homepage />
            </Button>
          </Link>
          
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
