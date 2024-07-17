import React, { useState } from 'react';

const TreeNode = ({ node }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="tree-3">
            <div onClick={handleExpand}>
                {node.name} {node.children.length > 0 && (expanded ? '-' : '+')}
            </div>
            {expanded && node.children.length > 0 && (
                <div className="tree-4">
                    {node.children.map((childGroup, index) => (
                        <div key={index} className="tree-5">
                            {childGroup.map((child, childIndex) => (
                                <div key={child.id} className="tree-6">
                                    <TreeNode node={child} />
                                    {childIndex < childGroup.length - 1 && <p className='or-text'>or</p>}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TreeNode;
