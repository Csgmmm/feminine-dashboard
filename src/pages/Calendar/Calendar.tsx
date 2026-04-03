import type { IUsers } from "../../types/types";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getUser } from "../../api/usersService";
import styles from "./calendar.module.css";
import ProfileDropdown from "../../profile/ProfileDropdown";
import CalendarElement from "../../calendarElement/CalendarElement";

function Calendar() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<IUsers | null>(null);

  useEffect(() => {
    getUser(user!.id).then((data) => {
      //quando acontecer a promessa, recebe o resultado em data
      setProfile(data); //chama a função setProfile para guardar o resultado em Profile e para atualizar o estado
    });
  }, [user]);

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
          <ProfileDropdown />
        </div>
        <div className={styles.container}>
          
          <CalendarElement />
          
        </div>
      </section>
    </>
  );
}

export default Calendar;
