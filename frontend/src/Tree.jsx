import React from 'react';
import TreeNode from './TreeNode';
import treeData from './treeData';

const Tree = ({ data }) => {
    return (
        <div className='tree-1'>
            {data.map((nodeGroup, groupIndex) => (
                <div key={groupIndex} className="tree-2">
                    {nodeGroup.map((node, nodeIndex) => (
                        <div key={node.id} className="tree-5">
                            <TreeNode node={node} />
                            {nodeIndex < nodeGroup.length - 1 && <p className="or-text">or</p>}
                        </div>
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
