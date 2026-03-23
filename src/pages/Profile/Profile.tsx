import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./profile.module.css";
import type { IUsers } from "../../types/types";
import { getUser } from "../../api/usersService";
import Card from "../../card/Card";
import supabase from "../../api/supabaseClient";
import Button from "../../button/Button";

function Profile() {
  const { user } = useAuth(); //Aqui, vai ao AuthContext buscar o User para saber quem esta logged in
  const [profile, setProfile] = useState<IUsers | null>(null); //para guardar os dados e usa-los

  const [dataPeriod, setDataPeriod] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleDataPeriod = async () => {
    const result = await supabase.auth.getUser();
    const user = result.data.user;

    const { data, error: supabaseError } = await supabase
      .from("cycles")
      .select("*")
      .eq("user_id", user!.id)
      .order("startDate", { ascending: false });

    if (supabaseError) {
      setError(supabaseError.message);
      return;
    }

    if (data) {
      setDataPeriod(data);
    }
  };

  useEffect(() => {
    handleDataPeriod();
    //quando o user mudar, executa o useEffect (mostra a img do profile)
    getUser(user!.id).then(setProfile); //vai ao Supabase à tabela users, onde o user_id é igual ao id do user auth. o ! e da para certeza que há smp user
  }, [user]); //apenas volta a correr o useffect, quando o user mudar
  if (!profile) return <p>Loading...</p>; //se nao houver profile, aparece o <p></p>

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
          <Button variant="secondary"><p>Hi</p></Button>
          
        </Card>
<<<<<<< HEAD
        <footer>
=======
        <Card>
          
          <div className={styles.containerCycleInput}>
            <span className={styles.titleInput}>Latest cycle:</span>
            <span>
              <input
                className={styles.inputCycle}
                disabled
                type="text"
                value={dataPeriod[0]?.length ?? 0}
                placeholder="Menstrual cycle"
              />
              <span>Days</span>
            </span>
            {error && <p style={{ color: "red" }}>Erro: {error}</p>}
          </div>
          <div className={styles.containerDateInput}>
            <span className={styles.titleInput}>Last period:</span>
            <span>
              <input
                className={styles.inputDate}
                disabled
                type="text"
                value={dataPeriod[0].startDate}
                placeholder="Date of your period"
              />
              <span>Days</span>
            </span>
            <p className={styles.note}>
              All these values depend on your logs, so they might change.
            </p>
            {error && <p style={{ color: "red" }}>Erro: {error}</p>}
          </div>
          <footer>
>>>>>>> 3bc4269042747b3683758ba427c52aeaca3b880e
            <ul className={styles.linksFooter}>
              <li>
                <a href="#">
                  <i className="fab fa-instagram icon"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-facebook-f icon"></i>{" "}
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-linkedin-in icon"></i>
                </a>
              </li>
            </ul>
          </footer>
<<<<<<< HEAD
=======
        </Card>
>>>>>>> 3bc4269042747b3683758ba427c52aeaca3b880e
      </div>
    </>
  );
}

export default Profile;