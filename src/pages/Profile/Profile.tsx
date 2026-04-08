import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./profile.module.css";
import type { IUsers } from "../../types/types";
import { getUser, updateUserEmail } from "../../api/usersService";
import Card from "../../card/Card";
import Button from "../../button/Button";
import {
  Bell,
  Camera,
  LogOut,
  Settings,
} from "lucide-react";
import { updateUserName } from "../../api/usersService";
import Toggle from "../../toggle/Toggle";
import { useNavigate } from "react-router-dom";
import supabase from "../../api/supabaseClient";

function Profile() {
  const { user } = useAuth(); //Aqui, vai ao AuthContext buscar o User para saber quem esta logged in
  const [profile, setProfile] = useState<IUsers | null>(null); //utiliza todos os elemtos que estao no IUsers no TS, name, email, avatar e id
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [periodAlert, setPeriodAlert] = useState(false);
  const [pmsAlert, setPmsAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUser(user!.id).then((data) => {
      if (!data) return;
      setProfile(data);
      setNewName(data.name);
      setNewEmail(data.email);
    });
  }, [user]);

  const saveAll = async () => {
    await updateUserName(user!.id, newName);
    await updateUserEmail(user!.id, newEmail);
    setProfile({ ...profile!, name: newName, email: newEmail });
    setNewName(""); //após guardar, dá reset e fica um string vazio
    setNewEmail("");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (!profile) return <span className={styles.loading}>Loading...</span>; //enquanto nao houver dados, aparece loading

  //para a CTA disabled
  const infoChanged =
    (newName !== profile.name && newName !== "") ||
    (newEmail !== profile.email && newEmail !== "");

  return (
    <>
      <div className={styles.main}>
        <div className={styles.profileId}>
          <div className={styles.profileImg}>
            <img
              className={styles.img}
              src={profile.avatar}
              alt={profile.name}
            />
            <button className={styles.cameraBtn}>
              <Camera width={14} />
            </button>
          </div>
          <p className={styles.name}>{profile.name}</p>
          <p className={styles.email}>{profile.email}</p>
        </div>

        <Card className={styles.Card}>
          <span className={styles.title}>
            <span className={styles.icon}>
              <Settings />
            </span>
            <h3 className={styles.iconTitle}>Settings</h3>
          </span>

          <div className={styles.settingsContainer}>
            <div className={styles.inputsContainer}>
              <label className={styles.titleLabel}>
                Name
                <input
                  type="text"
                  value={newName}
                  placeholder="Insert name"
                  onChange={(e) => setNewName(e.target.value)}
                  className={styles.input}
                />
              </label>

              <label className={styles.titleLabel}>
                Email
                <input
                  type="text"
                  value={newEmail}
                  placeholder="Insert email"
                  onChange={(e) => setNewEmail(e.target.value)}
                  className={styles.input}
                />
              </label>

              <label className={styles.titleLabel}>
                ID
                <input
                  type="text"
                  value={profile.id}
                  disabled={true}
                  placeholder="Insert email"
                  className={styles.inputDisabled}
                />
              </label>
            </div>
            <Button
              variant="primary"
              className={styles.button}
              onClick={saveAll}
              disabled={!infoChanged}
            >
              Save changes
            </Button>
          </div>
        </Card>

        <Card className={styles.Card}>
          <span className={styles.title}>
            <span className={styles.icon}>
              <Bell />
            </span>
            <h3 className={styles.iconTitle}>Notifications</h3>
          </span>
          <div className={styles.notificationsContainer}>
            <Toggle
              isOn={periodAlert}
              onToggle={() => setPeriodAlert(!periodAlert)}
              label="Upcoming period "
            />
            <Toggle
              isOn={pmsAlert}
              onToggle={() => setPmsAlert(!pmsAlert)}
              label="Before Premenstrual syndrome alerts"
            />
            {/* isOn={isOn} passa o estado atual do toggle (true ou false) pq é boolean */}
            {/* onToggle={() ação, inverte o estado, se estava true passa a false e vice-versa*/}
          </div>
        </Card>
        <Card className={styles.Card}>
          <span className={styles.title}>
            <span className={styles.icon}>
              <Bell />
            </span>
            <h3 className={styles.iconTitle}>Data</h3>
          </span>
          <span className={styles.dataContainer}>
            <Button variant="primary" className={styles.button}>
              Export data as PDF
            </Button>
            <p className={styles.note}>
              You can take this file to a medical appointment
            </p>
          </span>
        </Card>
        <div className={styles.footer}>
          <Button className={styles.button} variant="secondary" onClick={logout}>
            <LogOut width={18} />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}

export default Profile;
