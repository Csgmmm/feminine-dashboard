import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "../layout/Layout";
import type { ReactNode } from "react";

//useAuth() vai ao AuthContext buscar o user e loading
// loading, ainda está a verificar, mostra "loading..."
// Se não há user, manda para /login
// Se há user, mostra a página com o Layout
const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth(); //ProtectedRoute recebe children e vai buscar o user e o loading ao contexto de autenticação

  if (loading) return <p>A carregar...</p>; //Se ainda estiver a carregar mostra uma mensagem,
  if (!user) return <Navigate to="/login" />; // se não houver utilizador redireciona para o login,

  return <Layout>{children}</Layout>; // caso contrário renderiza a página com o Layout.
};

export default PrivateRoute;
