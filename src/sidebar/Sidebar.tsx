import { Link } from "react-router-dom";
import styles from "./sidebar.module.css";
import Homepage from "../homepage/Homepage";
import Logo from "../logo/Logo";

function Sidebar() {
  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <Logo/>
          <span className={styles.logoText}>MyCycle</span>
        </div>

        <nav className="nav">
          <Link to={"/homepage"}>
            <button>
              <Homepage />
              <span>Home</span>
            </button>
          </Link>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
