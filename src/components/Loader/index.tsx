import React from "react";
import classNames from "classnames";
import styles from "./style.module.less";

interface iLoaderProps {
  spinning: boolean;
  fullScreen?: boolean;
}

const Loader: React.FC<iLoaderProps> = ({ spinning = false, fullScreen }) => {
  return (
    <div
      className={classNames(styles.loader, {
        [styles.hidden]: !spinning,
        [styles.fullScreen]: fullScreen,
      })}
    >
      <div className={styles.warpper}>
        <div className={styles.inner} />
        <div className={styles.text}>LOADING</div>
      </div>
    </div>
  );
};

export default Loader;
