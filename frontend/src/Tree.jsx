import React from 'react';
import TreeNode from './TreeNode';

const Tree = ({ data }) => {
    return (
        <div>
            {data.map((node) => (
                <TreeNode key={node.id} node={node} />
            ))}
        </div>
    );
};

export default Tree;
