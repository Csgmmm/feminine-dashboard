import supabase from "./supabaseClient";
import type { ICycles } from "../types/types";

export const getCycles = async (userId: string): Promise<ICycles[]> => {
  const { data, error } = await supabase
    .from("cycles")
    .select("*")
    .eq("user_id", userId)
    .order("startDate", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return data as ICycles[];
};

export const createCycle = async (userId: string, cycle: Omit<ICycles, "id">): Promise<void> => {
  const { error } = await supabase
    .from("cycles")
    .insert({ ...cycle, user_id: userId });

  if (error) console.error(error);
};