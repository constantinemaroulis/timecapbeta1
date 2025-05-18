import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function CostCodeAllocation({ employees, costCodes }) {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        employee_id: '',
        cost_code_id: '',
        hours: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/api/cost-code-assign');
    };

    return (
        <div>
            <h1>Cost Code Allocation</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Employee:</label>
                    <select
                        value={data.employee_id}
                        onChange={(e) => setData('employee_id', e.target.value)}
                    >
                        <option value="">Select an Employee</option>
                        {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                                {emp.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Cost Code:</label>
                    <select
                        value={data.cost_code_id}
                        onChange={(e) => setData('cost_code_id', e.target.value)}
                    >
                        <option value="">Select a Cost Code</option>
                        {costCodes.map((code) => (
                            <option key={code.id} value={code.id}>
                                {code.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Hours:</label>
                    <input
                        type="number"
                        value={data.hours}
                        onChange={(e) => setData('hours', e.target.value)}
                    />
                </div>
                <button type="submit" disabled={processing}>Assign</button>
            </form>
        </div>
    );
}
