import React from 'react';
import TreeNode from './TreeNode';
import treeData from './treeData';

const Tree = ({ data }) => {
    return (
        <div>
            {data.map((nodeGroup, index) => (
                <div key={index} className="root-group">
                    {nodeGroup.map((node) => (
                        <TreeNode key={node.id} node={node} />
                    ))}
                </div>
            ))}
        </div>
    );
};

const App = () => {
    return (
        <div>
            <h1>Tree Component</h1>
            <Tree data={treeData} />
        </div>
    );
};

export default App;
