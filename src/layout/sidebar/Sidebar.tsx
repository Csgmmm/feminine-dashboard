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
  Menu,
  Star,
  UserPen,
} from "lucide-react";
import Card from "../../card/Card";

interface ISidebar {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

function Sidebar({ isOpen, setIsOpen }: ISidebar) {
  const location = useLocation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login"); //Cria uma função assíncrona que espera que o Supabase
    // termine o logout do utilizador e depois redireciona para a página de login.
  };
  return (
    <>
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
      >
        {isOpen && ( //se o isOpen for true, entao mostra o que esta aqui dentro
          <>
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
              {/* Se o sidebar estiver aberto, passa a false (fecha) ao clicar no icon */}
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
              <Button
                variant="tertiary"
                className={styles.button}
                onClick={handleLogout}
              >
                <LogOut />
                <span className={styles.logOutBtn}>Logout</span>
              </Button>
            </nav>
          </>
        )}
        
        <Button
          className={styles.hamburguer}
          onClick={() => setIsOpen(!isOpen)}
          variant="link"
        >
          <Menu />
        </Button>
      </aside>
    </>
  );
}

export default Sidebar;
