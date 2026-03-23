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
        <footer>
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
      </div>
    </>
  );
}

export default Profile;