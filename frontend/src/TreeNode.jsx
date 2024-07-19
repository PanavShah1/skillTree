import React, { useState } from 'react';
import Context from './Context';

const TreeNode = ({ node }) => {
    const { allExpand } = React.useContext(Context);
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    React.useEffect(() => {
        setExpanded(allExpand);
    }, [allExpand]);

    return (
        <div className="tree-4">
            <div onClick={handleExpand} className='expand'>
                <div className='expand-row'><p className='course-code'>{node.code}</p> {node.children.length > 0 && <p>{expanded ? '▶' : '▼'}</p>}</div>
                <p className='course-name'>{node.name}</p>
                {node.course_offered ? <p className='course-instructor'>{node.instructor}</p> : <p className='course-not-offered'>Course Not Offered</p>}
            </div>
            {expanded && node.children.length > 0 && (
                <div className="tree-5">
                    {node.children.map((childGroup, index) => (
                        <div key={index} className='tree-6'>
                            <div key={index} className="tree-7">
                                {childGroup.map((child, childIndex) => (
                                    <div key={child.id} className="tree-8">
                                        <TreeNode node={child} />
                                        {childIndex < childGroup.length - 1 && <p className='or-text'>or</p>}
                                    </div>
                                ))}
                            </div>
                            {index < node.children.length - 1 && <p className='and-text'>and</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TreeNode;
