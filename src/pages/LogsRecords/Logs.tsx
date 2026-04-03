import type { IUsers } from "../../types/types";
import { useAuth } from "../../context/AuthContext";
import styles from "./logs.module.css";
import { useEffect, useState } from "react";
import { getUser } from "../../api/usersService";
import ProfileDropdown from "../../profile/ProfileDropdown";
import supabase from "../../api/supabaseClient";

function Logs() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<IUsers | null>(null);
  const [logs, setLogs] = useState<any[]>([]);

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

          <ProfileDropdown />
        </div>
        <div className={styles.containerTable}>
          <h2 className={styles.titleLogs}>Your logs</h2>

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
              {logs.map((log) => (
                //O react precisa da key na unidade que se repete que no caso é o table row. Para saber tbm como reagir quando os dados mudam, usar a key para ligar os dados certos. e o log.id, o react sabe que id é cada dado e se mudar um dado apenas, ele sabe que é para mudar apenas aquele.
                <tr key={log.id}>
                  <td>{log.startDatePeriod}</td>
                  <td>{log.endDatePeriod}</td>
                  <td>{log.intensity}</td>
                  <td>{log.pain?.join(", ") || "None"}</td>
                  {/* tem pain? então joina-se a virgula e o espaço e torna o json em string. Senão houver dados, retorna None */}
                  <td>{log.sleep}</td>
                  <td>{log.exercise ? "Yes" : "No"}</td>
                  {/* Boolean. tem exercise? então o true é Yes, ou o false é No  */}
                  <td>{log.cravings?.join(", ") || "None"}</td>
                  <td>{log.energy}</td>
                  <td>{log.skin?.join(", ") || "None"}</td>
                  <td>{log.hair}</td>
                  <td>{log.mood?.join(", ") || "None"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Table mobile */}
          <div className={styles.tableMobile}>
            {logs.map((log) => (
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
                    <td>{log.intensity}</td>
                  </tr>
                  <tr>
                    <td>Pain</td>
                    <td>{log.pain?.join(", ") || "None"}</td>
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
                    <td>{log.cravings?.join(", ") || "None"}</td>
                  </tr>
                  <tr>
                    <td>Energy</td>
                    <td>{log.energy}</td>
                  </tr>
                  <tr>
                    <td>Skin</td>
                    <td>{log.skin?.join(", ") || "None"}</td>
                  </tr>
                  <tr>
                    <td>Hair</td>
                    <td>{log.hair}</td>
                  </tr>
                  <tr>
                    <td>Mood</td>
                    <td>{log.mood?.join(", ") || "None"}</td>
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
