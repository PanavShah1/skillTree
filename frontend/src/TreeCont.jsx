import React from "react";
import Tree from "./Tree";
import treeData from "./treeData";
import Context from "./Context";

const TreeCont = () => {

    const [allExpand, setAllExpand] = React.useState(false);
    function handleExpand() {
        setAllExpand(!allExpand);
    }
    return (
        <div>
            <Context.Provider value={{ allExpand, setAllExpand }}>
                <Tree data={treeData}/>
                <button onClick={handleExpand}>{allExpand ? <p>Minimise All</p> : <p>Expand All</p>}</button>
            </Context.Provider>
        </div>
    );
}

export default TreeCont;