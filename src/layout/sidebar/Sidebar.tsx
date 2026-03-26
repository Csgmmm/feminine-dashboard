import { Link, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";
import Logo from "../../logo/Logo";
import Button from "../../button/Button";

import { useNavigate } from "react-router-dom";
import supabase from "../../api/supabaseClient";
import {
  Calendar1,
  LayoutDashboard,
  List,
  LogOut,
  Star,
  UserPen,
} from "lucide-react";
import Card from "../../card/Card";

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
              variant="tertiary"
              isActive={location.pathname === "/homepage" ? true : false}
              className={styles.button}
            >
              <LayoutDashboard />
              <h1>Dashboard</h1>
            </Button>
          </Link>
          <Link to={"/calendar"}>
            <Button
              variant="tertiary"
              isActive={location.pathname === "/calendar" ? true : false}
              className={styles.button}
            >
              <Calendar1 />
              <h1>Calendar</h1>
            </Button>
          </Link>
          <Link to={"/logs"}>
            <Button
              variant="tertiary"
              isActive={location.pathname === "/logs" ? true : false}
              className={styles.button}
            >
              <List />
              <h1>Logs</h1>
            </Button>
          </Link>
          <Link to={"/profile"}>
            <Button
              variant="tertiary"
              isActive={location.pathname === "/profile" ? true : false}
              className={styles.button}
            >
              <UserPen />
              <h1>Profile</h1>
            </Button>
          </Link>
        </nav>
        <nav className={styles.bottomNav}>
          <Card variant="upgrade" className={styles.cardPremium}>
            <h3 className={styles.titleCard}>Get Premium</h3>
            <h4 className={styles.titlesSubTitle}>
              Advanced Cycle insights & predictions
            </h4>
            <Button variant="primary" className={styles.primaryButton}>
              <h1>Upgrade Now</h1>
              <span><Star /></span>
            </Button>
          </Card>
          <Button
            variant="tertiary"
            className={styles.button}
            onClick={handleLogout}
          >
            <LogOut />
            <h1>Logout</h1>
          </Button>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
