import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./profile.module.css";
import type { IUsers } from "../../types/types";
import { getUser, updateUserEmail } from "../../api/usersService";
import Card from "../../card/Card";
import Button from "../../button/Button";
import { Bell, Camera, Pencil, Settings } from "lucide-react";
import { updateUserName } from "../../api/usersService";
import Toggle from "../../toggle/Toggle";

function Profile() {
  const { user } = useAuth(); //Aqui, vai ao AuthContext buscar o User para saber quem esta logged in
  const [profile, setProfile] = useState<IUsers | null>(null); //utiliza todos os elemtos que estao no IUsers no TS, name, email, avatar e id
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isOn, setIsOn] = useState(false); //o ison é o valor atual.
  // e o setOn é a função para mudar o valor, de acordo com o onToggle
  // que criei na interface do component

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

          <div className={styles.container}>
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
          <div className={styles.container}>
            <Toggle
              isOn={isOn}
              onToggle={() => setIsOn(!isOn)}
              label="Upcoming period "
            />
            <Toggle
              isOn={isOn}
              onToggle={() => setIsOn(!isOn)}
              label="Before Premenstrual syndrome alerts"
            />
            {/* isOn={isOn} passa o estado atual do toggle (true ou false) pq é boolean */}
            {/* onToggle={() ação, inverte o estado, se estava true passa a false e vice-versa*/}
          </div>
          
        </Card>
      </div>
    </>
  );
}

export default Profile;
