import React from 'react';

const CostCodeList = ({ costCodes, onDrag, onDrop }) => {
    return (
        <div className="cost-code-list">
            {costCodes.map((costCode) => (
                <div
                    key={costCode.id}
                    draggable
                    onDragStart={() => onDrag(costCode, 'costCode')}
                    onDrop={() => onDrop(costCode, 'user')}
                    className="cost-code-item"
                >
                    <div className="cost-code-number">{costCode.number}</div>
                    <div className="cost-code-description">{costCode.description}</div>
                    <button className="edit-button">+</button>
                </div>
            ))}
        </div>
    );
};

export default CostCodeList;
