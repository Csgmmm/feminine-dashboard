import Card from "../card/Card";
import styles from "./homepage.module.css";

function Homepage() {
  return (
    <>
      <section className={styles.main}>
        <h2>Overview</h2>
        <h4>Track your cycle, symptoms and wellbeing.</h4>
        <div className={styles.grid}>
          <Card>
            <h2>Hi</h2>
          </Card>
          <Card>
            <h2>Hi</h2>
          </Card>
        </div>
      </section>
    </>
  );
}

export default Homepage;
