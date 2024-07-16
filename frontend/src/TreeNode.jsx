import React, { useState } from 'react';

const TreeNode = ({ node }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <div onClick={handleExpand}>
                {node.name} {node.children.length > 0 && (expanded ? '-' : '+')}
            </div>
            {expanded && node.children.length > 0 && (
                <div style={{ marginLeft: '20px' }}>
                    {node.children.map((child) => (
                        <TreeNode key={child.id} node={child} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TreeNode;
