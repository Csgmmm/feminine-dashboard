import "react-calendar/dist/Calendar.css";
import { useAuth } from "../context/AuthContext";
import supabase from "../api/supabaseClient";
import styles from "./calendarElement.module.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar/src/Calendar.js";

function CalendarElement() {
  const { user } = useAuth();
  const [dataPeriod, setDataPeriod] = useState<any[]>([]);

  const handleDataPeriod = async () => {
    const { data } = await supabase
      .from("cycles")
      .select("*")
      .eq("user_id", user!.id)
      .order("startDate", { ascending: false });

    if (data) setDataPeriod(data);
  };

  useEffect(() => {
    handleDataPeriod();
  }, [user]);

  const isPeriodDay = (date: Date) => {
    //função que recebe uma data
    return dataPeriod.some((cycle) => {
      //percorre os itens do dataPeriod e verifica de pelo menos um item satisfaz as condições:
      const start = new Date(cycle.startDatePeriod); //converte a string da base de dados num formato Date
      const end = new Date(cycle.endDatePeriod); //igual
      return date >= start && date <= end; //retorna a data maior ou igual que a o start e menor ou igual que o end
    });
  };
  return (
    <div className={styles.container}>
      <Calendar className={styles.calendar}
        tileClassName={({ date }) => {
          //para cada quadrado do calendar, o Calendar executa a função, pegando na data que acabou de criar e colocando no parametro {date}:
          if (isPeriodDay(date)) return styles.periodDay; //depois pega nesse {date} do calendar e envia como argumento para a função isPeriodDay(date) e se a data estiver dentro ciclo (função que criei anteriormente), retorna com o estilo
          return null;
        }}
      />
    </div>
  );
  //titleClassName - é a class para o componente Calendar do React
  //{({ date }) - o primeiro {} é o universo JS. o segundo () é a arrow function. o terceiro {} é o destructuring do date
}

export default CalendarElement;
