import { Link } from "react-router-dom";
import style from "./sidebar.module.css";
import Homepage from "../homepage/Homepage";

function Sidebar() {
  return (
    <>
      <aside className={style.sidebar}>
        <div className={style.logoContainer}>
          <span className="logoText">MyCycle</span>
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
