import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import QForm from "./components/QForm";
import LoadingSpinner from "./components/LoadingSpinner";
import WrapperCard from "./components/WrapperCard";
import Header from "./components/Header";


export default function Home() {
  const [result, setResult] = useState();
  const [isSpinnerDisplayed, setIsSpinnerDisplayed] = useState(false);

  const ingredientsList = result?.ingredients?.map((ing) => {
    return <li>{ing}</li>;
  });

  const iinstructionsList = result?.instruction?.map((ins) => {
    return <li>{ins}</li>;
  });

  const resultContent = result && (
    <>
      <h3 className={styles.recipeTitle}>{result?.name}</h3>
      <div className={styles.recipeBody}>
        <ul className={styles.ingredientsList}>{ingredientsList}</ul>
        <ul className={styles.instructionsList}>{iinstructionsList}</ul>
      </div>
    </>
  );


  const icon = "/dog.png";
  const title = "What's to eat???";

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <Header icon={icon} title={title}></Header>


      <main className={styles.main}>
          <QForm
          setResult={setResult}
          setIsSpinnerDisplayed={setIsSpinnerDisplayed}
        />
        {isSpinnerDisplayed && <LoadingSpinner/>}
        <WrapperCard children={resultContent}></WrapperCard>
      </main>
    </div>
  );
}
