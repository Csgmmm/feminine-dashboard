import { type ReactNode } from "react";
import styles from "./layout.module.css";
import Sidebar from "../sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import supabase from "../api/supabaseClient";

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login"); //Cria uma função assíncrona que espera que o Supabase
    // termine o logout do utilizador e depois redireciona para a página de login.
  };
  return (
    <section id={styles.sidebar}>
      <Sidebar />
      <main className={styles.main}>
        <button onClick={handleLogout}>Logout</button>
        {children}
        <footer>Footer!</footer>
      </main>
      
    </section>
  );
};

export default Layout;
