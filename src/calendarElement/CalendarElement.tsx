import "react-calendar/dist/Calendar.css";
import { useAuth } from "../context/AuthContext";
import supabase from "../api/supabaseClient";
import styles from "./calendarElement.module.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar/src/Calendar.js";

function CalendarElement() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<any[]>([]);
  const [cycles, setCycles] = useState<any[]>([]);

  const handleLogs = async () => {
    const { data } = await supabase
      .from("logs")
      .select("*")
      .eq("user_id", user!.id);
    if (data) setLogs(data); // guarda os dados no estado setlogs
  };

  const handleCycles = async () => {
    const { data } = await supabase
      .from("cycles")
      .select("*")
      .eq("user_id", user!.id);
    if (data) setCycles(data);
  };

  useEffect(() => {
    handleLogs(); // quando o componente carregar vai buscar os logs
    handleCycles(); // e os cycles
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
    </div>
    //{ universo JSX }, ({ date }) é o destructuring do objeto date. (objeto) {destructuring}
  );
}

export default CalendarElement;
