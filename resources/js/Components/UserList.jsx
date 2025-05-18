import React, { useState } from 'react';

const UserList = ({ userSessions, onDrag, onDrop, editingHours, setEditingHours }) => {
    const [tempHours, setTempHours] = useState('');

    const handleEdit = (userSession) => {
        setEditingHours(userSession.id);
        setTempHours(userSession.hours_worked || '0');
    };

    const handleSave = (userSession) => {
        userSession.hours_worked = tempHours; // Temporary for UI; you’d update backend here
        setEditingHours(null);
    };

    const handleHoursChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) { // Regex to allow only numbers
            setTempHours(value);
        }
    };

    return (
        <div className="user-list">
            {userSessions.map((userSession) => (
                <div
                    key={userSession.id}
                    draggable
                    onDragStart={() => onDrag(userSession, 'user')}
                    onDrop={() => onDrop(userSession, 'costCode')}
                    className="user-item"
                >
                    <div className="user-name">{userSession.user.name}</div>
                    <div className="user-trade">{userSession.user.trade_no}</div>
                    <div className="user-hours">
                        {editingHours === userSession.id ? (
                            <>
                                <input
                                    type="text"
                                    value={tempHours}
                                    onChange={handleHoursChange}
                                    className="hours-input"
                                />
                                <button onClick={() => handleSave(userSession)}>Save</button>
                            </>
                        ) : (
                            `${userSession.hours_worked || '0'} hrs`
                        )}
                    </div>
                    <button className="edit-button" onClick={() => handleEdit(userSession)}>+</button>
                </div>
            ))}
        </div>
    );
};

export default UserList;
