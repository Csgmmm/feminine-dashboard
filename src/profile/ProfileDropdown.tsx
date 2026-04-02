import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getUser } from "../api/usersService";
import supabase from "../api/supabaseClient";
import type { IUsers } from "../types/types";
import styles from "./profileDropdown.module.css";
import { ChevronDown, LogOut, UserPen } from "lucide-react";
import Button from "../button/Button";

function Profile() {
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
    <div className={styles.containerProfile}>
      <button
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
        onClick={() => setIsOpen((previous) => !previous)}
      >
        <img className={styles.img} src={profile.avatar} alt={profile.name} />
        <span className={styles.nameIcon}>
          <p className={styles.name}>{profile.name}</p>
          <ChevronDown />
        </span>
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          <Button variant="tertiary" className={styles.dropBtn}>
            <Link to="/profile">
              <UserPen width={18} />{" "}
              <span className={styles.dropBtnText}>Profile</span>
            </Link>
          </Button>
          <span className={styles.btnLogout}>
            <Button
              variant="tertiary"
              onClick={logout}
              className={styles.dropBtnLogout}
            >
              <LogOut width={18} />
              <span className={styles.dropBtnText}>Logout</span>
            </Button>
          </span>
        </div>
      )}
    </div>
  );
}

export default Profile;
