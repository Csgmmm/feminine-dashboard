import { useState, useEffect } from "react";
import Card from "../card/Card";
import styles from "./homepage.module.css";
import supabase from "../api/supabaseClient";
import type { IUsers } from "../types/types";
import { useAuth } from "../context/AuthContext";
import { getUser } from "../api/usersService";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import EmptyState from "../emptyState/EmptyState";
import Cycle from "../cycle/Cycle";
import CalendarElement from "../calendarElement/CalendarElement";
import ProfileDropdown from "../profile/ProfileDropdown";
import ModalLogs from "../modal/ModalLogs";

function Homepage() {
  const { user } = useAuth();
  const [dataPeriod, setDataPeriod] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<IUsers | null>(null);
  const [dataLogs, setDataLogs] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

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
      .from("logs") //vai buscar ao table editor
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
    if (!user) return; 

    getUser(user.id).then((data) => {
      if (data) setProfile(data);
    });
    handleDataLogs();
    handleDataPeriod();
  }, [user]);

  // Bloquear scroll quando a modal está aberta
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

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

          <ProfileDropdown />
        </div>

        {error && <p>Error: {error}</p>}
        {/* deu erro? então, mostra o <p></p> */}

        {dataPeriod.length === 0 && dataLogs.length === 0 ? (
          <div className={styles.emptystate}>
            <EmptyState />
            <span className={styles.emptystateText}>
              <h4>Nothing here yet.</h4>
              <small>Log your cycle to see your data here</small>
            </span>
            <Button variant="primary" onClick={() => setIsOpen(true)}>
              Start logging
            </Button>
          </div>
        ) : (
          /* O conteúdo abaixo só aparece se houver dados */
          <>
            <div className={styles.grid}>
              <Card>
                <div className={styles.containerCard}>
                  <div className={styles.titleCardLength}>
                    <h5 className={styles.titleCard}>Last Cycle</h5>
                    {dataPeriod.length > 0 ? ( //a duração do dataPeriod é maior que 0? entao, mostra o <p> que é o item mais recente que esta na lenght</p>
                      <h1>{dataPeriod[0].length} days</h1>
                    ) : (
                      // senao, mostra este <p></p>
                      <span className={styles.loading}>No info</span>
                    )}
                  </div>

                  <Button variant="link">
                    <Link to={"/calendar"}>
                      <span className={styles.linkIcon}>
                        <ArrowRight />
                      </span>
                    </Link>
                  </Button>
                </div>
              </Card>

              <Card>
                <div className={styles.containerCard}>
                  <div className={styles.titleCardLength}>
                    <h5 className={styles.titleCard}>Logs</h5>
                    {dataLogs.length > 0 ? (
                      <h1>{dataLogs.length}</h1>
                    ) : (
                      <span className={styles.loading}>No info</span>
                    )}
                  </div>
                  <Button variant="link">
                    <Link to={"/logs"}>
                      <span className={styles.linkIcon}>
                        <ArrowRight />
                      </span>
                    </Link>
                  </Button>
                </div>
              </Card>

              <Card>
                <div className={styles.containerCard}>
                  <div className={styles.titleCardLength}>
                    <h5 className={styles.titleCard}>Average Cycle</h5>
                    <h1>
                      {averageCycle !== "No info" ? (
                        <>{averageCycle} days</>
                      ) : (
                        <span className={styles.loading}>No info</span>
                      )}
                    </h1>
                    {/* o averageCycle é dif do "No info" ? Então, mostra x , senão : mostra y */}
                  </div>
                </div>
              </Card>

              <Card>
                <div className={styles.containerCard}>
                  <div className={styles.titleCardLength}>
                    <h5 className={styles.titleCard}>Last Period</h5>
                    {dataPeriod.length > 0 ? (
                      <h1>
                        {new Date(dataPeriod[0].startDate).toLocaleDateString(
                          "en-GB",
                          { day: "numeric", month: "long" },
                        )}
                        {/* // vou ter um novo tipo de data para os dados dataPeriod[0].startDate, em que vai formatar a data em que a data terá "en-GB" como idioma e terá 2 parametros, day que é numerico e o month que é long */}
                      </h1>
                    ) : (
                      <span className={styles.loading}>No info</span>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            <div className={styles.containerCycleCalendar}>
              <div className={styles.cycle}>
                <Cycle />

                {/* se clicar neste botão */}
                <Button variant="primary" onClick={() => setIsOpen(true)}>
                  Log your symptoms
                </Button>

                {/* ao abrir, vai dispultar isto: 1. é uma overlay que ocupa o ecrã todo por trás. 2. é a modal */}
                {isOpen && (
                  <>
                    <div
                      className={styles.overlay}
                      onClick={() => setIsOpen(false)}
                    />
                    <Card className={styles.openModal}>
                      <ModalLogs onClose={() => setIsOpen(false)} />
                      {/* ao clicar no x, que é o que está no component modal, vai dar trigger e vai fechar (false) */}
                    </Card>
                  </>
                )}
              </div>
              <div className={styles.calendarContainer}>
                <Card>
                  <div className={styles.containerArrowCalendar}>
                  <h3>Your calendar</h3>
                  <Button variant="link">
                    <Link to={"/calendar"}>
                      <span className={styles.linkIcon}>
                        <ArrowRight />
                      </span>
                    </Link>
                  </Button></div>
                  <CalendarElement />
                </Card>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default Homepage;
