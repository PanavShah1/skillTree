// TreeNode.js
import React, { useState } from 'react';

const TreeNode = ({ node }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="tree-node">
            <div onClick={handleExpand}>
                {node.name} {node.children.length > 0 && (expanded ? '-' : '+')}
            </div>
            {expanded && node.children.length > 0 && (
                <div className="tree-node-children">
                    {node.children.map((childGroup, index) => (
                        <div key={index} className="child-group">
                            {childGroup.map((child) => (
                                <TreeNode key={child.id} node={child} />
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TreeNode;
