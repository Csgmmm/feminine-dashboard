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

        {error && <p style={{ color: "red" }}>Erro: {error}</p>}
        {/* deu erro? então, mostra <p></p> */}

        <div className={styles.grid}>
          <Card>
            <h3>Last Cycle</h3>
            {dataPeriod.length > 0 ? (
              <p>{dataPeriod[0].length} days</p>
            ) : (
              <p>No info</p>
            )}
          </Card>

          <Card>
            <h3>Logs</h3>
            <p>{dataPeriod.length} logs</p>
          </Card>

          <Card>
            <h3>Last Period</h3>
            {dataPeriod.length > 0 && <p>{dataPeriod[0].startDate}</p>}
            {/* sendo que organizei o ascending do mais recente para o mais antigo, o [0], singifica que ele vai buscar o elemento mais recente do array */}
            {/* a duração do dataperiod e maior que 0? então, vai buscar o startdate do primeiro item do dataperiod */}
          </Card>
        </div>
      </section>
    </>
  );
}

export default Homepage;
