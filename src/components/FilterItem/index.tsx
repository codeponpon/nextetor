import React from "react";
import styles from "./style.module.less";

interface IFilterProps {
  label: string;
  children: React.ReactNode;
}

const FilterItem: React.FC<IFilterProps> = ({ label = "", children }) => {
  const labelArray = label.split("");
  return (
    <div className={styles.filterItem}>
      {labelArray.length > 0 && (
        <div className={styles.labelWrap}>
          {labelArray.map((item, index) => (
            <span className="labelText" key={index}>
              {item}
            </span>
          ))}
        </div>
      )}
      <div className={styles.item}>{children}</div>
    </div>
  );
};

export default FilterItem;
