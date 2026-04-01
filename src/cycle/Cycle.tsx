import styles from "./cycle.module.css";
import supabase from "../api/supabaseClient";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Chip from "../chip/Chip";

function Cycle() {
  const { user } = useAuth();
  const [dataPeriod, setDataPeriod] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

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
    handleDataPeriod();
  }, [user]);

  if (dataPeriod.length === 0) return <span>Loading...</span>; //só calcula depois de ter dados

  //cycle
  const today = new Date();
  const lastPeriod = new Date(dataPeriod[0].startDate);
  const cycleLength = dataPeriod[0].length || 28;
  const daysOfCycle = Math.floor(
    (today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24) + 1,
  );
  // Arredondando para baixo. Converto a data de hoje para milissegundos, subtraindo com a data do ultimo period
  //Depois divido este valor por outro valor que é a conversão dos milissegundos para dias.
  // E adiciono o +1 pq é o primeiro dia do ciclo.

  const progress = (daysOfCycle / cycleLength) * 100; //que percentagem do ciclo ja passou, dividindo o valor do resultado ds dias do ciclo e o valor ciclo total

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {
        <div className={styles.cycleCircle}>
          <svg viewBox="0 0 100 100" width="350" height="350">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="#ffffff"
              stroke="#e8e8e8"
              strokeWidth="8"
            />

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#ff9daf"
              strokeWidth="8"
              strokeDasharray={`${progress * 2.51} 251`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className={styles.cycleText}>
            <span className={styles.today}>TODAY</span>
            <h2>Day {daysOfCycle}</h2>
            <span>
              <Chip variant="primary">
                Day {daysOfCycle} of {cycleLength}
              </Chip>
            </span>
          </div>
        </div>
      }
    </div>
  );
}

export default Cycle;
