import { useState, useEffect } from "react"; // Adicionamos o useEffect
import Card from "../card/Card";
import styles from "./homepage.module.css";
import supabase from "../api/supabaseClient";
import type { IUsers } from "../types/types";
import { useAuth } from "../context/AuthContext";
import { getUser } from "../api/usersService";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const { user } = useAuth();
  const [dataPeriod, setDataPeriod] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<IUsers | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleDataPeriod = async () => {
    const result = await supabase.auth.getUser();
    const user = result.data.user;

    const { data, error: supabaseError } = await supabase
      .from("cycles") //vai buscar ao table editor Cycles
      .select("*") //vai buscar todos
      .eq("user_id", user!.id) //tem de ser igual ao user_id, e nunca será null
      .order("startDate", { ascending: false }); //esta ordenado do recente para o antigo

    if (supabaseError) {
      setError(supabaseError.message);
      return;
    }

    if (data) {
      setDataPeriod(data);
    }
  };

  useEffect(() => {
    getUser(user!.id).then((data) => {
      setProfile(data);
      handleDataPeriod();
    });
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };
  if (!profile) return <span className={styles.loading}>Loading...</span>;

  return (
    <>
      <section className={styles.main}>
        <div className={styles.containerHeader}>
          <span>
            <h2>Overview</h2>
            <h4>Track your cycle, symptoms and wellbeing.</h4>
          </span>

          <div className={styles.containerProfile}>
            <button
              className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
              onClick={() => setIsOpen((previous) => !previous)}
            >
              {/* ao clicar, ele vai chamar o setIsOpen para atualizar o estado anterior do isOpen */}
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
                <Button variant="tertiary">
                  <Link to="/profile">Profile</Link>
                </Button>
                <Button variant="tertiary" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>

        {error && <p>Erro: {error}</p>}
        {/* deu erro? então, mostra o <p></p> */}

        <div className={styles.grid}>
          <Card>
            <h3>Last Cycle</h3>
            {dataPeriod.length > 0 ? ( //a duração do dataPeriod é maior que 0? entao, mostra o <p> que é o item mais recente que esta na lenght</p>
              <p>{dataPeriod[0].length} days</p>
            ) : (
              // senao, mostra este <p></p>
              <span className={styles.loading}>No info</span>
            )}
          </Card>

          <Card>
            <h3>Logs</h3>
            {dataPeriod.length > 0 ? (
              <p>{dataPeriod.length} Logs</p>
            ) : (
              <span className={styles.loading}>No info</span>
            )}
          </Card>

          <Card>
            <h3>Last Period</h3>
            {dataPeriod.length > 0 ? (
              <p>{dataPeriod[0].startDate}</p>
            ) : (
              <span className={styles.loading}>No info</span>
            )}
          </Card>
        </div>
      </section>
    </>
  );
}

export default Homepage;
