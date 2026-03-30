import type { IUsers } from "../../types/types";
import { useAuth } from "../../context/AuthContext";
import styles from "./logs.module.css";
import { useEffect, useState } from "react";
import { getUser } from "../../api/usersService";
import ProfileDropdown from "../../profile/ProfileDropdown";

function Logs() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<IUsers | null>(null);

  useEffect(() => {
    getUser(user!.id).then((data) => {
      setProfile(data);
    });
  }, [user]);

  if (!profile) return <span className={styles.loading}>Loading...</span>;

  return (
    <>
      <section className={styles.main}>
        <div className={styles.containerHeader}>
          <span>
            <h2 className={styles.title}>
              Everything you've tracked, in one place
            </h2>
            <p>
              Your personal health history. Every entry helps paint a clearer
              picture of your cycle over time
            </p>
          </span>

          <ProfileDropdown />
        </div>
      </section>
    </>
  );
}

export default Logs;
