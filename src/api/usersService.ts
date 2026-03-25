import supabase from "./supabaseClient";
import { type IUsers } from "../types/types";

export const getUser = async (userId: string): Promise<IUsers | null> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) { console.error(error); return null; }
  return data as IUsers;
};

export const createUser = async (userId: string, name: string, avatar: string): Promise<void> => {
  const { error } = await supabase
    .from("users")
    .insert({ user_id: userId, name, avatar });

  if (error) console.error(error);
};

export const updateUserName = async (userId: string, name: string) => {
  const { error } = await supabase
    .from("users")
    .update({ name })
    .eq("user_id", userId);

  if (error) throw error;
};

export const updateUserEmail = async (userId: string, email: string) => {
  const {error} = await supabase
  .from("users")
  .update({email})
  .eq("user_id", userId);
  if (error) throw error
}