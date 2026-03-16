import supabase from "./supabaseClient";
import type { ILogs } from "../types/types";

export const getLogs = async (userId: string): Promise<ILogs[]> => {
  const { data, error } = await supabase
    .from("logs")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    return [];
  }
  return data.map((row: { content: ILogs }) => row.content);
};

export const createLog = async (userId: string, log: ILogs): Promise<void> => {
  const { error } = await supabase
    .from("logs")
    .insert({ user_id: userId, date: log.date, content: log });

  if (error) console.error(error);
};
