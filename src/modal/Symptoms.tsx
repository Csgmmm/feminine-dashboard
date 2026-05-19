import { useState } from "react";
import styles from "./symptoms.module.css";
import supabase from "../api/supabaseClient";
import Button from "../button/Button";

interface ISymptoms {
  pain: string[];
  energy: string;
  mood: string[];
  skin: string[];
  hair: string;
}

const SymptomsForm = ({ onClose }: { onClose: () => void }) => {
  const [data, setData] = useState<ISymptoms>({
    pain: [],
    energy: "",
    mood: [],
    skin: [],
    hair: "",
  });

  const toggleMultiSelect = (field: keyof ISymptoms, value: string) => {
    setData((prev) => {
      const currentValues = prev[field] as string[];
      const isSelected = currentValues.includes(value);
      const newValues = isSelected
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };

  const setSingleSelect = (field: keyof ISymptoms, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      // 1 - vai buscar o utilizador logado
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("User not found");
        return;
      }

      const today = new Date().toISOString().split("T")[0];

      // 2 - prepara os logs
      const payload = {
        user_id: user.id,
        pain: data.pain.length > 0 ? data.pain : ["None"],
        mood: data.mood.length > 0 ? data.mood : ["None"],
        skin: data.skin.length > 0 ? data.skin : ["None"],
        energy: data.energy || "None",
        hair: data.hair || "None",
        startDatePeriod: today,
      };

      // 3 - upsert nos Logs
      const { error: errorLog } = await supabase
        .from("logs")
        .upsert(payload, { onConflict: "user_id,startDatePeriod" });

      if (errorLog) throw errorLog;

      // 4 - só reinicia o ciclo se o último foi há mais de 5 dias
      const { data: lastCycle } = await supabase
        .from("cycles")
        .select("startDate")
        .eq("user_id", user.id)
        .order("startDate", { ascending: false })
        .limit(1)
        .single();

      const daysSinceLastCycle = lastCycle
        ? Math.floor(
            (new Date().getTime() - new Date(lastCycle.startDate).getTime()) /
              (1000 * 60 * 60 * 24),
          )
        : 999;

      if (daysSinceLastCycle >= 5) {
        const { error: errorCycle } = await supabase.from("cycles").insert({
          user_id: user.id,
          startDate: today,
          length: 28,
        });

        if (errorCycle) throw errorCycle;
        alert("Symptoms saved and Cycle updated!");
      } else {
        alert("Symptoms saved successfully!");
        onClose();
      }
    } catch (error) {
      alert("Error saving data.");
    }
  };

  return (
    <div className={styles.container}>
      {/* Mood */}
      <div className={styles.section}>
        <h3 className={styles.label}>Mood</h3>
        <div className={styles.buttonGroup}>
          {["Energetic", "Happy", "Calm", "Sensitive", "Anxious"].map(
            (option) => (
              <button
                key={option}
                type="button"
                className={`${styles.button} ${data.mood.includes(option) ? styles.active : ""}`}
                onClick={() => toggleMultiSelect("mood", option)}
              >
                {option}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Pain */}
      <div className={styles.section}>
        <h3 className={styles.label}>Pain</h3>
        <div className={styles.buttonGroup}>
          {["None", "Cramps", "Headache", "Breast"].map((option) => (
            <button
              key={option}
              type="button"
              className={`${styles.button} ${data.pain.includes(option) ? styles.active : ""}`}
              onClick={() => toggleMultiSelect("pain", option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Energy */}
      <div className={styles.section}>
        <h3 className={styles.label}>Energy</h3>
        <div className={styles.buttonGroup}>
          {["Low", "Medium", "High"].map((option) => (
            <button
              key={option}
              type="button"
              className={`${styles.button} ${data.energy === option ? styles.active : ""}`}
              onClick={() => setSingleSelect("energy", option)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Skin */}
        <div className={styles.section}>
          <h3 className={styles.label}>Skin</h3>
          <div className={styles.buttonGroup}>
            {["Oily", "Acne", "Sensitive", "Dry", "Clear"].map((option) => (
              <button
                key={option}
                type="button"
                className={`${styles.button} ${data.skin.includes(option) ? styles.active : ""}`}
                onClick={() => toggleMultiSelect("skin", option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Hair */}
        <div className={styles.section}>
          <h3 className={styles.label}>Hair</h3>
          <div className={styles.buttonGroup}>
            {["Oily", "Dry", "Normal"].map((option) => (
              <button
                key={option}
                type="button"
                className={`${styles.button} ${data.hair === option ? styles.active : ""}`}
                onClick={() => setSingleSelect("hair", option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button
        variant="primary"
        className={styles.saveButton}
        onClick={handleSubmit}
      >
        Save logs
      </Button>
    </div>
  );
};

export default SymptomsForm;
