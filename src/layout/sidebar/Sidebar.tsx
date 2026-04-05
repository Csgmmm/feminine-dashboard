import { Link, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";
import Logo from "../../logo/Logo";
import Button from "../../button/Button";

import {
  Calendar1,
  LayoutDashboard,
  List,
  Menu,
  Star,
  UserPen,
} from "lucide-react";
import Card from "../../card/Card";
import ProfileDropdown from "../../profile/ProfileDropdown";

interface ISidebar {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

function Sidebar({ isOpen, setIsOpen }: ISidebar) {
  const location = useLocation();

  return (
    <>
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
      >
        <div className={styles.sidebarHeader}>
          {isOpen && (
            <Link to={"/homepage"}>
              <div className={styles.logoContainer}>
                <Logo />
                <span className={styles.logoText}>MyCycle</span>
              </div>
            </Link>
          )}
          {/* Botão do menu */}
          <div className={styles.btnHamburguer}>
            <Button onClick={() => setIsOpen(!isOpen)} variant="link">
              <Menu />
            </Button>
          </div>
        </div>

        {isOpen && (
          <>
            <nav className={styles.nav}>
              <Link to={"/homepage"}>
                <Button
                  variant="tertiary"
                  isActive={location.pathname === "/homepage"}
                  className={styles.button}
                >
                  <LayoutDashboard />
                  <h4>Dashboard</h4>
                </Button>
              </Link>
              <Link to={"/calendar"}>
                <Button
                  variant="tertiary"
                  isActive={location.pathname === "/calendar"}
                  className={styles.button}
                >
                  <Calendar1 />
                  <h4>Calendar</h4>
                </Button>
              </Link>
              <Link to={"/logs"}>
                <Button
                  variant="tertiary"
                  isActive={location.pathname === "/logs"}
                  className={styles.button}
                >
                  <List />
                  <h4>Logs</h4>
                </Button>
              </Link>
              <div className={styles.profileForDesktop}>
              <Link to={"/profile"}>
                <Button
                  variant="tertiary"
                  isActive={location.pathname === "/profile"}
                  className={styles.button}
                >
                  <UserPen />
                  <h4>Profile</h4>
                </Button>
              </Link></div>
              <div className={styles.profileForMobile}>
              <ProfileDropdown /></div>
            </nav>

            <nav className={styles.bottomNav}>
              <Card variant="upgrade" className={styles.cardPremium}>
                <h3 className={styles.titleCard}>Get Premium</h3>
                <h4 className={styles.titlesSubTitle}>
                  Advanced Cycle insights & predictions
                </h4>
                <Button variant="primary" className={styles.primaryButton}>
                  <span className={styles.buttonUpgrade}>Upgrade Now</span>
                  <span>
                    <Star />
                  </span>
                </Button>
              </Card>
            </nav>
          </>
        )}
      </aside>
    </>
  );
}

export default Sidebar;
