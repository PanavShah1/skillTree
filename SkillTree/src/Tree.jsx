import React from 'react';
import TreeNode from './TreeNode';
import treeData from './treeData';

const Tree = ({ data }) => {
    return (
        <div className='tree-1'>
            {data.map((nodeGroup, groupIndex) => (
                <div key={groupIndex} className='tree-2'>
                    <div key={groupIndex} className="tree-3">
                        <div className="tree-7">
                            {nodeGroup.map((node, nodeIndex) => (
                                <div key={node.id} className="tree-8">
                                    <TreeNode node={node} />
                                    {nodeIndex < nodeGroup.length - 1 && <p className="or-text">or</p>}
                                </div>
                                
                            ))}
                            </div>
                        </div>
                    {groupIndex < data.length - 1 && <p className="and-text">and</p>}
                </div>
            ))}
        </div>
    );
};

export default Tree;
