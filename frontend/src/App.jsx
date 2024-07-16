import React from "react";
import "./style.css";
import Tree from "./Tree";
import treeData from "./treeData";

const App = () => {
    return (
        <div>
            <h1>Welcome to SkillTree</h1>
            <Tree data={treeData}/>
        </div>
    )
}

export default App;