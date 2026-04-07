import "react-calendar/dist/Calendar.css";
import { useAuth } from "../context/AuthContext";
import supabase from "../api/supabaseClient";
import styles from "./calendarElement.module.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";

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
    // data do calendario começa a meia noite.
    const calendarDate = new Date(date);
    calendarDate.setHours(0, 0, 0, 0);

    // Faço um find para que me vá aos logs e me encontre o primeiro que der match:
    const log = logs.find((log) => {
      // tem data de início? Não, então ignora
      if (!log.startDatePeriod) return false;

      // 1. caso tenha, adiciona ao startDatePeriod as horas guardando milisegundos
      const start = new Date(log.startDatePeriod);
      start.setHours(0, 0, 0, 0);

      // 2.Plano A: E se tiver um endDatePeriod, adiciona ao endDatePeriod as horas guardando milisegundos
      if (log.endDatePeriod) {
        const end = new Date(log.endDatePeriod);
        end.setHours(0, 0, 0, 0);

        // 3. Se der match, ele vai retornar os dias que forem maior ou iguais que o start e menores ou iguais que o end.
        return calendarDate >= start && calendarDate <= end;
      }

      // 2. Plano B: Se chegou a esta linha é pq o log nao tem data de fim. Caso nao tivesse esta linha, não iria aparecer nada do ultimo log
      //Ele vai buscar a hora da data do calendario e compara com a hora do startDatePeriod
      return calendarDate.getTime() === start.getTime();
    });

    // No fim de tudo, se houver um log da intensidade ele retorna, senão não retorna nada
    return log?.intensity || null;
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
