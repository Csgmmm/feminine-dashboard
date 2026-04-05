import type { IUsers } from "../../types/types";
import { useAuth } from "../../context/AuthContext";
import styles from "./logs.module.css";
import { useEffect, useState } from "react";
import { getUser } from "../../api/usersService";
import ProfileDropdown from "../../profile/ProfileDropdown";
import supabase from "../../api/supabaseClient";
import Button from "../../button/Button";

function Logs() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<IUsers | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [selectDate, setSelectedDate] = useState<string>("all"); //como é "All", quando a página for carregada, não filtra nada, mostra o Array inteiro nos filtros
  const reset = () => {
    setSelectedDate("all");
  }; // Volta a guardar "all" no estado

  // Extrair o nome do mês a partir da data
  const getMonthName = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
  };

  //cria um novo array apenas com os nomes dos meses nos logs startDatePeriod sem repetição
  const uniqueMonths = Array.from(
    new Set(logs.map((log) => getMonthName(log.startDatePeriod))),
  );

  //filtros
  const filteredLogs =
    selectDate === "all"
      ? logs
      : logs.filter((log) => getMonthName(log.startDatePeriod) === selectDate);
  //dentro de filteredLogs vai guardar a condição "se o selectedDate for igual a "all" então vai aparecer os logs todos" que é o que aparece quando a página é carregada, senão, ele vai a logs e faz o filter, que filtra cada log e retorna dentro desse log, o mês de cada log do startdateperiod e se for igual ao selectedate

  //useEffect
  useEffect(() => {
    if (!user) return; //a query só corre quando o user já existe
    //Se houver user, faz a query (chama os dados a base de dados) ao supabase:
    supabase
      .from("logs")
      .select("*")
      .eq("user_id", user.id)
      .order("startDatePeriod", { ascending: false })
      .then(({ data }) => {
        if (data) setLogs(data);
        //se a variavel data em que guardei dados tiver algo, vai pegar nesses dados e guardar na gaveta "logs", imprimindo no ecrã
      });
    //depois faz isto:
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

          <div className={styles.profileDropdown}>
          <ProfileDropdown /></div>
        </div>
        <div className={styles.containerTable}>
          <h2 className={styles.titleLogs}>Your logs</h2>
          <div className={styles.containerFilter}>
            <select
              className={styles.dateSelector}
              value={selectDate} //com base nisto, o que vai aparecer no input é o que escolher na dropdown, que inicialmente é "all" para mostrar tudo
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="all">All months</option>
              {uniqueMonths.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
                //quero que vá ao meu novo array, e por cada month, quero que ele retorne cada option com a key e o value de cada valor, mostrando cada valor (item/month) que estiver no array
                // O value={log.startDatePeriod} dentro da tag <option> define que o valor real que será enviado para o estado quando eu clico nessa opção é a data exata daquele log
              ))}
            </select>
            {/* "O value={selectedDate} garante que o seletor mostre smp o que está guardado no estado, que inicialmente é a string "all" para mostrar tudo, enquanto o onChange deteta quando eu clico numa nova opção, e usa o setSelectedDate(e.target.value) para extrair o valor do mes selecionado e atualizar o estado com o mesmo */}
            {/* Button reset, é só ligar ao estado inicial "All"*/}
            <Button variant="link" onClick={reset}>
              Reset filter
            </Button>
          </div>
          {/* Desktop */}
          <table className={styles.tableDesktop}>
            <thead>
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Intensity</th>
                <th>Pain</th>
                <th>Sleep</th>
                <th>Exercise</th>
                <th>Cravings</th>
                <th>Energy</th>
                <th>Skin</th>
                <th>Hair</th>
                <th>Mood</th>
              </tr>
            </thead>
            <tbody>
              {/* quero que ele vá ao logs que é onde está guardado os meus dados e que por cada log, retorna uma tabela com os dados desse log */}
              {filteredLogs.map((log) => (
                //O react precisa da key na unidade que se repete que no caso é o table row. Para saber tbm como reagir quando os dados mudam, usar a key para ligar os dados certos. e o log.id, o react sabe que id é cada dado e se mudar um dado apenas, ele sabe que é para mudar apenas aquele.
                <tr key={log.id}>
                  <td>{log.startDatePeriod}</td>
                  <td>{log.endDatePeriod}</td>
                  <td>
                    {log.intensity
                      ? log.intensity.charAt(0).toUpperCase() +
                        log.intensity.slice(1)
                      : "None"}
                  </td>
                  <td>
                    {log.pain?.join(", ").charAt(0).toUpperCase() +
                      log.pain?.join(", ").slice(1) || "None"}
                  </td>
                  {/* tem pain? então joina-se a virgula e o espaço e torna o json em string. Senão houver dados, retorna None */}
                  <td>{log.sleep}</td>
                  <td>{log.exercise ? "Yes" : "No"}</td>
                  {/* Boolean. tem exercise? então o true é Yes, ou o false é No  */}
                  <td>
                    {log.cravings?.join(", ").charAt(0).toUpperCase() +
                      log.cravings?.join(", ").slice(1) || "None"}
                  </td>
                  <td>
                    {log.energy
                      ? log.energy.charAt(0).toUpperCase() + log.energy.slice(1)
                      : "None"}
                  </td>
                  <td>
                    {log.skin?.join(", ").charAt(0).toUpperCase() +
                      log.skin?.join(", ").slice(1) || "None"}
                  </td>
                  <td>
                    {log.hair
                      ? log.hair.charAt(0).toUpperCase() + log.hair.slice(1)
                      : "None"}
                  </td>
                  <td>
                    {log.mood?.join(", ").charAt(0).toUpperCase() +
                      log.mood?.join(", ").slice(1) || "None"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Table mobile */}
          <div className={styles.tableMobile}>
            {filteredLogs.map((log) => (
              //Aqui, preciso que o map retorne toda a tabela por cada log. Ou seja, uma tabela por cada log.
              <table key={log.id} className={styles.entryTableMobile}>
                <thead>
                  <tr>
                    <th>
                      Period: {log.startDatePeriod} to {log.endDatePeriod}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Intensity</td>
                    <td>
                      {log.intensity
                        ? log.intensity.charAt(0).toUpperCase() +
                          log.intensity.slice(1)
                        : "None"}
                    </td>
                  </tr>
                  <tr>
                    <td>Pain</td>
                    <td>
                      {log.pain?.join(", ").charAt(0).toUpperCase() +
                        log.pain?.join(", ").slice(1) || "None"}
                    </td>
                  </tr>
                  <tr>
                    <td>Sleep</td>
                    <td>{log.sleep}</td>
                  </tr>
                  <tr>
                    <td>Exercise</td>
                    <td>{log.exercise ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td>Cravings</td>
                    <td>
                      {log.cravings?.join(", ").charAt(0).toUpperCase() +
                        log.cravings?.join(", ").slice(1) || "None"}
                    </td>
                  </tr>
                  <tr>
                    <td>Energy</td>
                    <td>
                      {log.energy
                        ? log.energy.charAt(0).toUpperCase() +
                          log.energy.slice(1)
                        : "None"}
                    </td>
                  </tr>
                  <tr>
                    <td>Skin</td>
                    <td>
                      {log.skin?.join(", ").charAt(0).toUpperCase() +
                        log.skin?.join(", ").slice(1) || "None"}
                    </td>
                  </tr>
                  <tr>
                    <td>Hair</td>
                    <td>
                      {log.hair
                        ? log.hair.charAt(0).toUpperCase() + log.hair.slice(1)
                        : "None"}
                    </td>
                  </tr>
                  <tr>
                    <td>Mood</td>
                    <td>
                      {log.mood?.join(", ").charAt(0).toUpperCase() +
                        log.mood?.join(", ").slice(1) || "None"}
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
//thead: table head container. tr: table row. th: table header cell. td: table data.
export default Logs;
