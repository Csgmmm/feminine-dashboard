import { useState, useEffect } from "react"; // Adicionamos o useEffect
import Card from "../card/Card";
import styles from "./homepage.module.css";
import supabase from "../api/supabaseClient";

function Homepage() {
  const [dataPeriod, setDataPeriod] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

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
    handleDataPeriod();
  }, []);

  return (
    <>
      <section className={styles.main}>
        <h2>Overview</h2>
        <h4>Track your cycle, symptoms and wellbeing.</h4>

        {error && <p>Erro: {error}</p>}
        {/* deu erro? então, mostra o <p></p> */}

        <div className={styles.grid}>
          <Card>
            <h3>Last Cycle</h3>
            {dataPeriod.length > 0 ? ( //a duração do dataPeriod é maior que 0? entao, mostra o <p> que é o item mais recente que esta na lenght</p>
              <p>{dataPeriod[0].length} days</p>
            ) : (
              // senao, mostra este <p></p>
              <span className={styles.loading}>Loading...</span>
            )}
          </Card>

          <Card>
            <h3>Logs</h3>
            {dataPeriod.length > 0 ? (
              <p>{dataPeriod.length} Logs</p>
            ) : (
              <span className={styles.loading}>Loading...</span>
            )}
          </Card>

          <Card>
            <h3>Last Period</h3>
            {dataPeriod.length > 0 ? (<p>{dataPeriod[0].startDate}</p>) : (<span className={styles.loading}>Loading...</span>)}
          </Card>
        </div>
      </section>
    </>
  );
}

export default Homepage;
