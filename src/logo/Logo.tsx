import styles from "./logo.module.css"
import logo from "./logo.svg"

function Logo() {
    return (
        <>
        <img className={styles.logo} src={logo} alt="logo" width={42}/>
        </>
    )
}

export default Logo