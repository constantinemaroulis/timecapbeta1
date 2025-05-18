import React, { useState } from 'react';
import UserList from '../Components/UserList';
import CostCodeList from '../Components/CostCodeList';
import './CostCodeAllocator.css'; // For styling

const CostCodeAllocator = ({ userSessions, costCodes }) => {
    const [darkMode, setDarkMode] = useState(false); // Dark Mode Toggle
    const [allocationData, setAllocationData] = useState([]); // Keep track of allocations
    const [editingHours, setEditingHours] = useState(null); // Track editing state

    const handleDrag = (item, type) => {
        // Store dragged item and type (user or costCode)
        setAllocationData({ item, type });
    };

    const handleDrop = (targetItem, targetType) => {
        // Validate and assign based on drop target
        if (allocationData.type === 'user' && targetType === 'costCode') {
            console.log(`Allocated user ${allocationData.item.name} to costCode ${targetItem.number}`);
        } else if (allocationData.type === 'costCode' && targetType === 'user') {
            console.log(`Allocated costCode ${allocationData.item.number} to user ${targetItem.name}`);
        }

        // Clear drag state
        setAllocationData([]);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');
    };

    return (
        <div className={`cost-code-allocator ${darkMode ? 'dark' : ''}`}>
            <header>
                <h1>Cost Code Allocator</h1>
                <button onClick={toggleDarkMode}>
                    {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </button>
            </header>
            <div className="allocator-container">
                {/* Left List: Clocked-in Users */}
                <div className="user-list-container">
                    <h3>Clocked In Users</h3>
                    <UserList
                        userSessions={userSessions}
                        onDrag={handleDrag}
                        onDrop={handleDrop}
                        editingHours={editingHours}
                        setEditingHours={setEditingHours}
                    />
                </div>

                {/* Right List: Cost Codes */}
                <div className="cost-code-list-container">
                    <h3>Cost Codes</h3>
                    <CostCodeList
                        costCodes={costCodes}
                        onDrag={handleDrag}
                        onDrop={handleDrop}
                    />
                </div>
            </div>
        </div>
    );
};

export default CostCodeAllocator;
