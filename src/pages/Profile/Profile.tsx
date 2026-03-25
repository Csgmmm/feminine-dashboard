import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./profile.module.css";
import type { IUsers } from "../../types/types";
import { getUser, updateUserEmail } from "../../api/usersService";
import Card from "../../card/Card";
import Button from "../../button/Button";
import { Pencil } from "lucide-react";
import { updateUserName } from "../../api/usersService";

function Profile() {
  const { user } = useAuth(); //Aqui, vai ao AuthContext buscar o User para saber quem esta logged in
  const [profile, setProfile] = useState<IUsers | null>(null); //para guardar os dados e usa-los
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

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
  const infoChanged =
    (newName !== profile.name && newName !== "") ||
    (newEmail !== profile.email && newEmail !== "");

  return (
    <>
      <div className={styles.main}>
        <Card className={styles.Card}>
          <div className={styles.profileImg}>
            <img
              className={styles.img}
              src={profile.avatar}
              alt={profile.name}
            />
          </div>

          <p className={styles.name}>{profile.name}</p>
          <p className={styles.email}>{profile.email}</p>
          <Button variant="link">
            <p className={styles.icon}>
              <Pencil width={16} />
              Edit picture
            </p>
          </Button>

          <div className={styles.container}></div>
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
                placeholder="Insert email"
                className={styles.input}
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

          <footer>
            <ul className={styles.linksFooter}>
              <li>
                <a href="#">
                  <i className="fab fa-facebook-f icon"></i>{" "}
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-instagram icon"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-linkedin-in icon"></i>
                </a>
              </li>
            </ul>
          </footer>
        </Card>
      </div>
    </>
  );
}

export default Profile;
