import { useState } from "react";
import supabase from "../api/supabaseClient";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import Logo from "../logo/Logo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); //valor inicial do estado, sem nada escrito
  const [error, setError] = useState<string | null>(null); //valor inicial do estado null
  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = await supabase.auth.signInWithPassword({ email, password }); //"await" pausa aqui até o Supabase responder. quando responde, guarda tudo em "data"
    const error = data.error; //Extrai apenas o campo "error" da resposta. Se algo falhou, error tem a mensagem do problema

    if (error) {
      setError("Incorrect email or password.");
    } else {
      navigate("/homepage");
    }
  };
  return (
    <div className={styles.loginPage}>
      <Logo />
      <div className={styles.containerInput}>
        <h2>Welcome to MyCicle</h2>
        <h3>This is your safe place</h3>
        <input
          type="email"
          placeholder="Insert your email"
          value={email}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLogin();
            }
          }}
          onChange={(e) => setEmail(e.target.value)} //cada vez que algo mudar no input, atualiza o estado com o novo valor
          className={styles.inputEmail}
        />
        <input
          type="password"
          placeholder="Insert your password"
          value={password}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLogin();
            }
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        {/* "Se error tiver valor, mostra o <p> com a mensagem, senão não mostra nada." */}
        <button className="primary" onClick={handleLogin}>
          Log in
        </button>
      </div>
    </div>
  );
};

export default Login;
