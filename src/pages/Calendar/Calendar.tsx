import { Link, useNavigate } from "react-router-dom";
import type { IUsers } from "../../types/types";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getUser } from "../../api/usersService";
import supabase from "../../api/supabaseClient";
import styles from "./calendar.module.css";
import { ChevronDown, LogOut, UserPen } from "lucide-react";
import Button from "../../button/Button";

function Calendar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<IUsers | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getUser(user!.id).then((data) => {
      //quando acontecer a promessa, recebe o resultado em data
      setProfile(data); //chama a função setProfile para guardar o resultado em Profile e para atualizar o estado
    });
  }, [user]);

  const logout = async () => {
    //criei uma função que,
    await supabase.auth.signOut(); //espera que o método de logout da autenticação do Supabase seja concluído
    navigate("/login");
  };

  if (!profile) return <span className={styles.loading}>Loading...</span>;

  return (
    <>
      <section className={styles.main}>
        <div className={styles.containerHeader}>
          <span>
            <h2 className={styles.title}>Your cycle, at a glance</h2>
            <p>
              Tap any date to see what you logged from flow intensity to mood,
              cravings, and everything in between
            </p>
          </span>

          <div className={styles.containerProfile}>
            <button
              className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
              onClick={() => setIsOpen((previous) => !previous)}
            >
              {" "}
              <img
                className={styles.img}
                src={profile.avatar}
                alt={profile.name}
              />
              <span className={styles.nameIcon}>
                <p className={styles.name}>{profile.name}</p>
                <ChevronDown />
              </span>
            </button>
            {isOpen && (
              <div className={styles.dropdown}>
                <Button variant="tertiary" className={styles.dropBtn}>
                  <Link to="/profile">
                    <UserPen width={18} /> Profile
                  </Link>
                </Button>
                <Button
                  variant="tertiary"
                  onClick={logout}
                  className={styles.dropBtnLogout}
                >
                  <LogOut width={18} />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Calendar;
