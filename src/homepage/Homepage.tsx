import { useState, useEffect } from "react"; // Adicionamos o useEffect
import Card from "../card/Card";
import styles from "./homepage.module.css";
import supabase from "../api/supabaseClient";
import type { IUsers } from "../types/types";
import { useAuth } from "../context/AuthContext";
import { getUser } from "../api/usersService";
import { ChevronDown, LogOut, UserPen } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import EmptyState from "../emptyState/EmptyState";

function Homepage() {
  const { user } = useAuth();
  const [dataPeriod, setDataPeriod] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<IUsers | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dataLogs, setDataLogs] = useState<any[]>([]);
  const navigate = useNavigate();

  const averageCycle =
    dataPeriod.length > 0
      ? Math.round(
          dataPeriod.reduce((acc, curr) => acc + curr.length, 0) /
            dataPeriod.length,
        )
      : "No info";

  //Estou a criar uma variavel, em que ele vai ao length do dataPeriod. se algum valor for maior que 0, então ele vai arredondar o seguinte:
  //vai percorrer o DataPeriod, tendo 2 params, e vai acumular todos os valores da coluna length ao valor current, começando com o valor 0.
  //Depois, vai dividir esse valor, pelo numeros de items que ele tem na base de dados.
  //Se nao houver nenhum maior que 0, mostra o "N/A"

  const handleDataLogs = async () => {
    const { data, error: supabaseError } = await supabase
      .from("logs") //vai buscar ao table editor Cycles
      .select("*") //vai buscar todos
      .eq("user_id", user!.id); //tem de ser igual ao user_id, e nunca será null

    if (supabaseError) {
      setError(supabaseError.message);
      return;
    }
    if (data) {
      setDataLogs(data);
    }
  };

  //Vai ao supabase buscar os dados
  const handleDataPeriod = async () => {
    const { data, error: supabaseError } = await supabase
      .from("cycles") //vai buscar ao table editor Cycles
      .select("*") //vai buscar todos
      .eq("user_id", user!.id) //tem de ser igual ao user_id, e nunca será null
      .order("endDate", { ascending: false }); //esta ordenado do recente para o antigo

    if (supabaseError) {
      setError(supabaseError.message);
      return;
    }
    //Guarda os dados no estado e depois para usar os dados, usar dataPeriod
    if (data) {
      setDataPeriod(data);
    }
  };

  useEffect(() => {
    getUser(user!.id).then((data) => {
      setProfile(data);
      handleDataLogs();
      handleDataPeriod();
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
            <h2 className={styles.title}>Hello, {`${profile.name}`}</h2>
            <p>
              Your body has a rhythm. Let's listen to it. Track your cycle,
              symptoms and wellbeing.
            </p>
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

        {error && <p>Erro: {error}</p>}
        {/* deu erro? então, mostra o <p></p> */}

        {dataPeriod.length === 0 && dataLogs.length === 0 ? (
          <div className={styles.emptystate}>
            <EmptyState />
            <span className={styles.emptystateText}>
              <h4>Nothing here yet.</h4>
              <small>Log your cycle to see your data here</small>
            </span>
            <Button variant="primary">Start logging</Button>
          </div>
        ) : (
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
              {dataLogs.length > 0 ? (
                <p>{dataLogs.length} Logs</p>
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
            <Card>
              <h3>Average Cycle</h3>
              {averageCycle !== "No info" ? (
                `${averageCycle} days`
              ) : (
                <span className={styles.loading}>No info</span>
              )}
              {/* o averageCycle é dif do "No info" ? Então, mostra x , senão : mostra y */}
            </Card>
          </div>
        )}
      </section>
    </>
  );
}

export default Homepage;
