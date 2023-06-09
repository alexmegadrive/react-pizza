import styles from "./NotfoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div>
      <h1 className={styles.root}>
        <span>😢</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению, данная страница отсутствует на нашем сайте.
      </p>
    </div>
  );
};

export default NotFoundBlock;
