import "react-calendar/dist/Calendar.css";
import { useAuth } from "../context/AuthContext";
import supabase from "../api/supabaseClient";
import styles from "./calendarElement.module.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar/src/Calendar.js";

function CalendarElement() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleLogs = async () => {
    const { data } = await supabase
      .from("logs")
      .select("*")
      .eq("user_id", user!.id);
    if (data) setLogs(data); // guarda os dados no estado setlogs
  };

  useEffect(() => {
    handleLogs(); // quando o componente carregar vai buscar os logs
  }, [user]);

  const getDayIntensity = (date: Date) => {
    const log = logs.find((log) => {
      // percorre os logs e por cada log, procura o primeiro que:
      if (!log.startDatePeriod || !log.endDatePeriod) return false; // ignora logs sem datas
      const start = new Date(log.startDatePeriod); // converte a data de início de um formato string para um formato Date
      const end = new Date(log.endDatePeriod); //igual
      return date >= start && date <= end; //retornar os dias que forem maior ou iguais que o start e menores ou iguais que o end
    });
    return log?.intensity || null; //no final de tudo, se houver um log, então mostra a intensidade
  };

  return (
    <div className={styles.container}>
      <Calendar
        className={styles.calendar}
        value={selectedDate}
        onClickDay={(date) => {
          if (selectedDate?.toDateString() === date.toDateString()) {
            //passa a data selecionada para string e verifica se é igual à data selecionada

            setSelectedDate(null); //Se as datas forem iguais, significa que o user clicou num dia que já estava selecionado
          } else {
            setSelectedDate(date); //Se as datas forem diferentes, significa que o user clicou num dia diferente, então atualiza a data selecionada para a nova data clicada
          }
        }}
        tileClassName={({ date }) => {
          // para cada dia do calendário:
          const intensity = getDayIntensity(date); // vai buscar a intensidade desse dia
          if (intensity === "heavy") return styles.heavy;
          if (intensity === "medium") return styles.medium;
          if (intensity === "light") return styles.light;
          if (intensity === "spotting") return styles.spotting;
          if (intensity === "none") return styles.noneDay;
          return null; //senão houver intensidade não aplica classe
        }}
      />
      <div className={styles.legendContainer}>
        <div className={styles.title}>
          <h5>Intensity</h5>
        </div>
        <div className={styles.legend}>
          <p className={styles.heavy}>Heavy</p>
          <p className={styles.medium}>Medium</p>
          <p className={styles.light}>Light</p>
          <p className={styles.none}>None</p>
        </div>
      </div>
    </div>
    //{ universo JSX }, ({ date }) é o destructuring do objeto date. (objeto) {destructuring}
  );
}

export default CalendarElement;
