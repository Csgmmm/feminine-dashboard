import { Link, useNavigate } from "react-router-dom";
import type { IUsers } from "../../types/types";
import { useAuth } from "../../context/AuthContext";
import styles from "./logs.module.css";
import { useEffect, useState } from "react";
import { getUser } from "../../api/usersService";
import supabase from "../../api/supabaseClient";
import Button from "../../button/Button";
import { ChevronDown, LogOut, UserPen } from "lucide-react";

function Logs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<IUsers | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  

  useEffect(() => {
    getUser(user!.id).then((data) => {
      setProfile(data);
    });
  }, [user]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  
  if (!profile) return <span className={styles.loading}>Loading...</span>;

  return (
    <>
      <section className={styles.main}>
        <div className={styles.containerHeader}>
          <span>
            <h2 className={styles.title}>Everything you've tracked, in one place</h2>
            <p>
              Your personal health history. Every entry helps paint a clearer
              picture of your cycle over time
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

export default Logs;
