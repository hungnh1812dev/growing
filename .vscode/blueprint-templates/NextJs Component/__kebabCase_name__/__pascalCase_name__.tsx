import React from "react";

import styles from "./{{pascalCase name}}.module.css";

export interface {{pascalCase name}}DataType {}

interface {{pascalCase name}}Props {}

const {{pascalCase name}}:React.FC<{{pascalCase name}}Props> = (props) => {
    return (
        <div className={styles["root"]}>
            {{pascalCase name}} Component
        </div>
    )
}

export default {{pascalCase name}};