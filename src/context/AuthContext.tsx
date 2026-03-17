import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import supabase from "../api/supabaseClient";
import type { User } from "@supabase/supabase-js";

interface IAuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<IAuthContextType>({
  user: null,
  loading: true,
}); //cirei uma variavel. Dentro, vai criar contexto que é do tipo da interface, com valores padrão: user a null e loading a true. Estes valores são usados caso não haja nenhum Provider acima na árvore

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  //Esta variavel recebe um children que é do tipo reactNode.
  const [user, setUser] = useState<User | null>(null); //dentro da função, criei 2 gavetas para guardar a info. User: guarda o utilizador e o setUser e a forma como se usa a info que lá esta
  const [loading, setLoading] = useState(true); //Aqui, o loading guarda por uma resposta, começando com true.

  useEffect(() => {
    //Utilizo o useEffect para que, quando o componente aparecer no ecrã pela primeira vez, vá à API do Supabase buscar a sessão atual.
    supabase.auth.getSession().then(({ data }) => {
      //vai ao supabase, ao auth para ir buscar as sessões. e quando tiver a resposta, utiliza os dados para retornar:
      setUser(data.session?.user ?? null); //Quero atualizar a gaveta user, e para isso uso a chave setUser. O valor que lhe dou vem de data.session?.user, ou seja, vou ao data, verifico se tem sessão, e se tiver, guardo o utilizador. Se não houver nada, guardo null.
      setLoading(false); //aqui, abro a gaveta do loading que advém true, e após ele fazer a ação anterior, já pode ficar false, para que não continue a esperar por uma resposta.
    });
  }, []);

  //Fui buscar o const criado com o context criado. Em que é ele que vai provide toda a info aos filhos.
  //No value, quero que todos os componentes dentro das tags, tenham os conteudos das gavetas user e loading.
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); //Aqui, crio e exporto um atalho chamado useAuth. Que quando chamado, ele utiliza o contexto criado anteriormente. E noutros components, basta chamar useAuth()
