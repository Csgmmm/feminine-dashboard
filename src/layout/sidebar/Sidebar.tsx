import { Link, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";
import Homepage from "../../homepage/Homepage";
import Logo from "../../logo/Logo";
import Button from "../../button/Button";
import Calendar from "../../pages/Calendar/Calendar";
import Logs from "../../pages/LogsRecords/Logs";
import Profile from "../../pages/Profile/Profile";
import { useNavigate } from "react-router-dom";
import supabase from "../../api/supabaseClient";

function Sidebar() {
  const location = useLocation();

    const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login"); //Cria uma função assíncrona que espera que o Supabase
    // termine o logout do utilizador e depois redireciona para a página de login.
  };
  return (
    <>
      <aside className={styles.sidebar}>
        <Link to={"/homepage"}>
          <div className={styles.logoContainer}>
            <Logo />
            <span className={styles.logoText}>MyCycle</span>
          </div>
        </Link>

        <nav className={styles.nav}>
          <Link to={"/homepage"}>
            <Button
              variant="secondary"
              isActive={location.pathname === "/homepage" ? true : false}
              className={styles.button}
            >
              <Homepage />
            </Button>
          </Link>
          <Link to={"/calendar"}>
            <Button
              variant="secondary"
              isActive={location.pathname === "/calendar" ? true : false}
              className={styles.button}
            >
              <Calendar />
            </Button>
          </Link>
          <Link to={"/logs"}>
            <Button
              variant="secondary"
              isActive={location.pathname === "/logs" ? true : false}
              className={styles.button}
            >
              <Logs />
            </Button>
          </Link>
          <Link to={"/profile"}>
            <Button
              variant="secondary"
              isActive={location.pathname === "/profile" ? true : false}
              className={styles.button}
            >
              <Profile />
            </Button>
          </Link>
        </nav>
        <nav className={styles.navBottom}>
          <Button variant="secondary" className={styles.logOutButton} onClick={handleLogout}>Logout</Button>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
