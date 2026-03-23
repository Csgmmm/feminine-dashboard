import imgLogIn from "./imgLogIn.svg";
import styles from "./login.module.css"

function ImageLogIn() {
  return (
    <>
      <img className={styles.imgLogIn} src={imgLogIn} alt="logo" />
    </>
  );
}

export default ImageLogIn;
