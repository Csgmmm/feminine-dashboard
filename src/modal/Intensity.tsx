import { useState } from "react";
import styles from "./intensity.module.css";
import { type Bleeding } from "../types/types";
import Button from "../button/Button";
import supabase from "../api/supabaseClient";
import { Activity, Droplet, Droplets, Waves } from "lucide-react";

const Intensity = () => {
  const [selectedIntensity, setSelectedIntensity] =
    useState<Bleeding["intensity"]>("none");

  const options: {
    value: Bleeding["intensity"];
    label: string;
    icon: React.ReactNode;
  }[] = [
    { value: "spotting", label: "Spotting", icon: <Droplet size={20} /> },
    { value: "light", label: "Light", icon: <Droplets size={20} /> },
    { value: "medium", label: "Medium", icon: <Activity size={20} /> },
    { value: "heavy", label: "Heavy", icon: <Waves size={20} /> },
  ];

  const handleSubmit = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("Utilizador não encontrado.");
        return;
      }

      const today = new Date().toISOString().split("T")[0];

      // 1 - guardar apenas a intensidade na tabela logs
      const { error: errorLog } = await supabase.from("logs").upsert(
        {
          user_id: user.id,
          intensity: selectedIntensity,
          startDatePeriod: today,
        },
        { onConflict: "user_id,startDatePeriod" },
      );

      if (errorLog) throw errorLog;

      // 2 -se selecionou algo, assume-se início de período
      if (selectedIntensity !== "none" && selectedIntensity !== undefined) {
        const { error: errorCycle } = await supabase.from("cycles").upsert(
          {
            user_id: user.id,
            startDate: today,
            length: 28,
          },
          { onConflict: "user_id,startDate" },
        );

        if (errorCycle) throw errorCycle;
        alert("Intensity not saved");
      } else {
        alert("Intensity saved successfully!");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving data");
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.intensityGroup}>
        {options.map((option) => (
          <div
            key={option.value}
            className={styles.intensityItem}
            onClick={() => setSelectedIntensity(option.value)}
          >
            <div
              className={`${styles.iconCircle} ${
                selectedIntensity === option.value ? styles.activeCircle : ""
              }`}
            >
              <span className={styles.dropIcon}>{option.icon}</span>
            </div>

            <span
              className={`${styles.intensityText} ${
                selectedIntensity === option.value ? styles.activeText : ""
              }`}
            >
              {option.label}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.btnContainer}>
        <Button
          variant="primary"
          className={styles.saveButton}
          onClick={handleSubmit}
        >
          Save logs
        </Button>
      </div>
    </div>
  );
};

export default Intensity;
