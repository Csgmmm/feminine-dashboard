import styles from "./profile.module.css";

function Profile() {
  return (
    <div className={styles.main}>
      <footer>
        <ul className={styles.linksFooter}>
          <li>
            <a href="#">
              <i className="fab fa-instagram icon"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-facebook-f icon"></i>{" "}
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-linkedin-in icon"></i>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Profile;
